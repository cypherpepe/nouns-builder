import { Box, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useMemo } from 'react'
import useSWR from 'swr'

import { Avatar } from 'src/components/Avatar'
import Pagination from 'src/components/Pagination'
import { useEnsData } from 'src/hooks'
import { usePagination } from 'src/hooks/usePagination'
import { useLayoutStore } from 'src/stores'
import { useChainStore } from 'src/stores/useChainStore'

import { useDaoStore } from '../../stores'
import { firstRowItem, lastRowItem, row, rowItem } from './MembersList.css'

type DaoMember = {
  id: string
  daoTokenCount: string
  timeJoined: number
}
type MembersQuery = {
  membersList: DaoMember[]
}

export const MembersList = ({
  totalSupply,
  ownerCount,
}: {
  totalSupply?: number
  ownerCount?: number
}) => {
  const { query, isReady } = useRouter()
  const chain = useChainStore((x) => x.chain)
  const {
    addresses: { token },
  } = useDaoStore()
  const { isMobile } = useLayoutStore()
  const LIMIT = 10

  const {
    data: members,
    error,
    isValidating,
  } = useSWR(isReady ? [token, chain.id, query.page] : undefined, () =>
    axios
      .get<MembersQuery>(
        `/api/membersList/${token}?chainId=${chain.id}&page=${query.page}&limit=${LIMIT}`
      )
      .then((x) => x.data.membersList)
  )

  const { handlePageBack, handlePageForward } = usePagination(true)

  const hasNextPage = useMemo(() => {
    const totalPages = Math.ceil((ownerCount || 0) / LIMIT)
    const currentPage = Number(query.page) || 1
    return currentPage < totalPages
  }, [ownerCount, query.page])

  if (isValidating) return <MembersPanel isMobile={isMobile}>Loading...</MembersPanel>
  if (error) return <MembersPanel isMobile={isMobile}>Error</MembersPanel>

  return (
    <>
      <MembersPanel isMobile={isMobile}>
        {members?.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            totalSupply={totalSupply}
            isMobile={isMobile}
          />
        ))}
      </MembersPanel>
      <Pagination
        onNext={handlePageForward}
        onPrev={handlePageBack}
        isLast={!hasNextPage}
        isFirst={!query.page}
      />
    </>
  )
}

const MembersPanel = ({
  children,
  isMobile,
}: {
  children: ReactNode
  isMobile: boolean
}) => {
  return (
    <>
      <Text
        mb={{ '@initial': 'x4', '@768': 'x4' }}
        mt={{ '@initial': 'x4', '@768': 'x10' }}
        fontSize={28}
        fontWeight={'display'}
      >
        Members
      </Text>
      <Box
        borderRadius={'phat'}
        borderStyle={'solid'}
        borderWidth={'normal'}
        borderColor={'border'}
        pt={isMobile ? 'x8' : undefined}
        p={{ '@initial': 'x3', '@768': 'x6' }}
      >
        {isMobile || <TableHeader />}
        {children}
      </Box>
    </>
  )
}

const TableHeader = () => {
  return (
    <Flex className={row} mb={{ '@initial': 'x4', '@768': 'x12' }}>
      <Text fontWeight={'label'} className={firstRowItem}>
        Member
      </Text>
      <Text fontWeight={'label'} className={rowItem}>
        Tokens
      </Text>
      <Text fontWeight={'label'} className={rowItem}>
        Vote %
      </Text>
      <Text fontWeight={'label'} className={lastRowItem}>
        Joined
      </Text>
    </Flex>
  )
}

const MemberCard = ({
  member,
  totalSupply,
  isMobile,
}: {
  member: DaoMember
  totalSupply?: number
  isMobile: boolean
}) => {
  const { displayName, ensAvatar } = useEnsData(member.id)

  const timeJoined = useMemo(
    () => dayjs(dayjs.unix(member.timeJoined)).format('MMM DD, YYYY'),
    [member]
  )

  const votePercent = useMemo(() => {
    if (!totalSupply || !member.daoTokenCount) return '--'
    return ((Number(member.daoTokenCount) / totalSupply) * 100).toFixed(2)
  }, [totalSupply, member])

  return (
    <>
      {isMobile ? (
        <Link href={`/profile/${member.id}`} passHref>
          <Flex mb={'x14'} direction={'column'}>
            <Flex w="100%" align={'center'} mb={'x4'}>
              <Avatar address={member.id} src={ensAvatar} size="32" />
              <Text mx="x2" variant="paragraph-md">
                {displayName}
              </Text>
            </Flex>
            <Flex>
              <Text className={rowItem}>{member.daoTokenCount} Tokens</Text>
              <Text className={rowItem}>{votePercent}%</Text>
              <Text className={lastRowItem}>{timeJoined}</Text>
            </Flex>
          </Flex>
        </Link>
      ) : (
        <Link href={`/profile/${member.id}`} passHref>
          <Flex className={row} align={'center'} mb={'x10'}>
            <Flex w="100%" align={'center'} className={firstRowItem}>
              <Avatar address={member.id} src={ensAvatar} size="32" />
              <Text mx="x2" variant="paragraph-md">
                {displayName}
              </Text>
            </Flex>
            <Text className={rowItem}>{member.daoTokenCount} Tokens</Text>
            <Text className={rowItem}>{votePercent}%</Text>
            <Text className={lastRowItem}>Since {timeJoined}</Text>
          </Flex>
        </Link>
      )}
    </>
  )
}
