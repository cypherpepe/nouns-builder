import { ImageResponse } from '@vercel/og'
import { getFetchableUrl } from 'ipfs-service/src/gateway'
import { NextRequest } from 'next/server'

import { Proposal } from 'src/data/graphql/requests/proposalQuery'
import NogglesLogo from 'src/layouts/assets/builder-framed.svg'
import {
  parseBgColor,
  parseState,
} from 'src/modules/proposal/components/ProposalStatus.helper'

export const config = {
  runtime: 'edge',
}

const ptRootRegular = fetch(
  new URL('public/fonts/pt-root-ui_regular.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const ptRootMedium = fetch(
  new URL('public/fonts/pt-root-ui_medium.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

const ptRootBold = fetch(
  new URL('public/fonts/pt-root-ui_bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer())

export type ProposalOgMetadata = {
  daoName: string
  daoImage: string
  proposal: Proposal
}

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const rawData = searchParams.get('data')

  if (!rawData) return new Response(undefined, { status: 400 })

  const data: ProposalOgMetadata = JSON.parse(rawData)

  const [ptRootRegularData, ptRootMediumData, ptRootBoldData] = await Promise.all([
    ptRootRegular,
    ptRootMedium,
    ptRootBold,
  ])

  const proposalStatusColor = parseBgColor(data.proposal.status)

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          position: 'relative',
          justifyContent: 'space-around',
          backgroundColor: 'white',
          padding: '100px',
          width: '100%',
          height: '100%',
          fontFamily: 'PT Root UI',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: 50,
            left: 95,
          }}
        >
          <NogglesLogo
            fill={'white'}
            width="90"
            style={{ objectFit: 'contain', paddingRight: '2px' }}
            alt="logo"
          />
          <p style={{ marginLeft: '10px', fontWeight: 500 }}>Builder</p>
        </div>
        <div style={{ display: 'flex', position: 'absolute', bottom: 50, right: 95 }}>
          <p style={{ fontSize: '28px', color: '#808080' }}>nouns.build</p>
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            bottom: 50,
            left: 95,
          }}
        >
          <img
            alt="user image"
            src={getFetchableUrl(data.daoImage)}
            style={{ height: '52px', borderRadius: '9999px', marginRight: '10px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontSize: '28px', fontWeight: 700 }}>{data.daoName}</p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  marginRight: '12px',
                  color: '#808080',
                }}
              >
                Proposal {data.proposal.proposalNumber}
              </p>
              <p
                style={{
                  border: '2px solid',
                  borderColor: proposalStatusColor.borderColor,
                  borderRadius: '9999px',
                  padding: '4px 12px',
                  color: proposalStatusColor.color,
                }}
              >
                {parseState(data.proposal.status)}
              </p>
            </div>
            <p style={{ fontSize: '28px', fontWeight: 700 }}>{data.proposal.title}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                  marginRight: '42px',
                }}
              >
                For{' '}
                <span style={{ marginLeft: '6px', color: '#1CB687', fontWeight: 500 }}>
                  {data.proposal.forVotes}
                </span>
              </p>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                  marginRight: '42px',
                }}
              >
                Against{' '}
                <span style={{ marginLeft: '6px', color: '#F03232', fontWeight: 500 }}>
                  {data.proposal.againstVotes}
                </span>
              </p>
              <p
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                }}
              >
                Abstain{' '}
                <span style={{ marginLeft: '6px', color: '#808080', fontWeight: 500 }}>
                  {data.proposal.abstainVotes}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: 'PT Root UI',
          data: ptRootRegularData,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'PT Root UI',
          data: ptRootMediumData,
          style: 'normal',
          weight: 500,
        },
        {
          name: 'PT Root UI',
          data: ptRootBoldData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )
}
