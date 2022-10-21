import type { CreditCard } from '@prisma/client'

import {
  creditCards,
  creditCard,
  createCreditCard,
  updateCreditCard,
  deleteCreditCard,
} from './creditCards'
import type { StandardScenario } from './creditCards.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('creditCards', () => {
  scenario('returns all creditCards', async (scenario: StandardScenario) => {
    const result = await creditCards()

    expect(result.length).toEqual(Object.keys(scenario.creditCard).length)
  })

  scenario(
    'returns a single creditCard',
    async (scenario: StandardScenario) => {
      const result = await creditCard({ id: scenario.creditCard.one.id })

      expect(result).toEqual(scenario.creditCard.one)
    }
  )

  scenario('creates a creditCard', async (scenario: StandardScenario) => {
    const result = await createCreditCard({
      input: {
        alias: 'String',
        closingDate: '2022-10-21T22:07:01.056Z',
        dueDate: '2022-10-21T22:07:01.056Z',
        updatedAt: '2022-10-21T22:07:01.056Z',
        userId: scenario.creditCard.two.userId,
      },
    })

    expect(result.alias).toEqual('String')
    expect(result.closingDate).toEqual(new Date('2022-10-21T22:07:01.056Z'))
    expect(result.dueDate).toEqual(new Date('2022-10-21T22:07:01.056Z'))
    expect(result.updatedAt).toEqual(new Date('2022-10-21T22:07:01.056Z'))
    expect(result.userId).toEqual(scenario.creditCard.two.userId)
  })

  scenario('updates a creditCard', async (scenario: StandardScenario) => {
    const original = (await creditCard({
      id: scenario.creditCard.one.id,
    })) as CreditCard
    const result = await updateCreditCard({
      id: original.id,
      input: { alias: 'String2' },
    })

    expect(result.alias).toEqual('String2')
  })

  scenario('deletes a creditCard', async (scenario: StandardScenario) => {
    const original = (await deleteCreditCard({
      id: scenario.creditCard.one.id,
    })) as CreditCard
    const result = await creditCard({ id: original.id })

    expect(result).toEqual(null)
  })
})
