import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: { username: 'String', updatedAt: '2022-10-21T23:23:11.637Z' },
    },
    two: {
      data: { username: 'String', updatedAt: '2022-10-21T23:23:11.637Z' },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
