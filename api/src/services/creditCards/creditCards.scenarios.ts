import type { Prisma, CreditCard } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CreditCardCreateArgs>({
  creditCard: {
    one: {
      data: {
        alias: 'String',
        closingDate: '2022-10-21T22:07:01.073Z',
        dueDate: '2022-10-21T22:07:01.073Z',
        updatedAt: '2022-10-21T22:07:01.073Z',
        User: {
          create: { username: 'String', updatedAt: '2022-10-21T22:07:01.073Z' },
        },
      },
    },
    two: {
      data: {
        alias: 'String',
        closingDate: '2022-10-21T22:07:01.073Z',
        dueDate: '2022-10-21T22:07:01.073Z',
        updatedAt: '2022-10-21T22:07:01.073Z',
        User: {
          create: { username: 'String', updatedAt: '2022-10-21T22:07:01.073Z' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<CreditCard, 'creditCard'>
