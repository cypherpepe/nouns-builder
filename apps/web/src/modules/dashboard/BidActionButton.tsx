import { Box, Button } from '@zoralabs/zord'
import React, { useState } from 'react'
import { Address, parseEther } from 'viem'
import { useBalance, useNetwork } from 'wagmi'
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions'

import { ContractButton } from 'src/components/ContractButton'
import { auctionAbi } from 'src/data/contract/abis'
import { AddressType } from 'src/typings'
import { maxChar } from 'src/utils/helpers'

import { useMinBidIncrement } from '../auction'
import { Settle } from '../auction/components/CurrentAuction/Settle'
import { DashboardDao } from './Dashboard'
import { bidButton, bidForm, bidInput, minButton } from './dashboard.css'

export const BidActionButton = ({
  userAddress,
  chainId,
  auctionConfig,
  currentAuction,
  isEnded,
  auctionAddress,
  isOver,
}: DashboardDao & { userAddress: AddressType; isOver: boolean; isEnded: boolean }) => {
  const { data: balance } = useBalance({ address: userAddress, chainId })
  const { minimumBidIncrement, reservePrice } = auctionConfig
  const { highestBid } = currentAuction
  const { chain: wagmiChain } = useNetwork()
  const { minBidAmount } = useMinBidIncrement({
    highestBid: highestBid?.amount ? BigInt(highestBid?.amount) : undefined,
    reservePrice: BigInt(reservePrice),
    minBidIncrement: BigInt(minimumBidIncrement),
  })

  const [bidAmount, setBidAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isMinBid = Number(bidAmount) >= minBidAmount

  const isValidBid = bidAmount && isMinBid

  const isValidChain = wagmiChain?.id === chainId

  const handleCreateBid = async () => {
    if (!isMinBid || !bidAmount || isLoading) return

    try {
      setIsLoading(true)

      const config = await prepareWriteContract({
        abi: auctionAbi,
        address: auctionAddress as Address,
        functionName: 'createBid',
        args: [BigInt(currentAuction.token.tokenId)],
        value: parseEther(bidAmount.toString()),
      })
      console.log('config', config)
      const tx = await writeContract(config)
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })
      setBidAmount('')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isEnded || isOver) {
    return (
      <Settle
        isEnding={false}
        owner={highestBid?.bidder}
        externalAuctionAddress={auctionAddress}
        compact={true}
      />
    )
  }

  console.log('isMinBid', isMinBid)
  console.log('isValidBid', isValidBid)
  return (
    <>
      <form className={bidForm}>
        <Box position="relative" mr={'x2'}>
          <input
            className={bidInput}
            placeholder={maxChar(`${minBidAmount} ETH`, 12)}
            type={'number'}
            min={minBidAmount}
            // max={balance?.formatted}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <Button
            position="absolute"
            height={'100%'}
            mr={'x4'}
            px={'x0'}
            fontWeight={'label'}
            size="sm"
            variant="ghost"
            className={minButton}
            onClick={() => {
              setBidAmount(minBidAmount.toString())
            }}
            disabled={Number(bidAmount) >= minBidAmount}
          >
            Min
          </Button>
        </Box>
      </form>
      <ContractButton
        borderRadius={'curved'}
        disabled={!isValidBid || !isValidChain}
        loading={isLoading}
        handleClick={() => {
          handleCreateBid()
        }}
        position={'relative'}
        className={bidButton}
      >
        Bid
      </ContractButton>
    </>
  )
}
