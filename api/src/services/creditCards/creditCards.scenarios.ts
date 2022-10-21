import type { Prisma, CreditCard } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CreditCardCreateArgs>({
  creditCard: {
    one: {
      data: {
        alias: 'String',
        closingDate: 3279550,
        dueDate: 2246800,
        updatedAt: '2022-10-21T23:23:03.487Z',
        User: {
          create: { username: 'String', updatedAt: '2022-10-21T23:23:03.487Z' },
        },
      },
    },
    two: {
      data: {
        alias: 'String',
        closingDate: 4883127,
        dueDate: 4720923,
        updatedAt: '2022-10-21T23:23:03.487Z',
        User: {
          create: { username: 'String', updatedAt: '2022-10-21T23:23:03.487Z' },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<CreditCard, 'creditCard'>
