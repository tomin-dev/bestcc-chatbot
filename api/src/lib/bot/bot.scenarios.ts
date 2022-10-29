export const standard = defineScenario({
  user: {
    one: {
      data: {
        username: 'roeeyn',
        creditCards: {
          create: [
            {
              closingDate: 27,
            },
          ],
        },
        include: {
          creditCards: true,
        },
      },
    },
    // two: {
    //   data: {
    //     closingDate: 27,
    //     dueDate: 2,
    //     user: {
    //       create:{
    //         username: 'roeeyn'
    //       }
    //     },
    //   },
    // },
    // three: {
    //   data: {
    //     closingDate: 30,
    //     dueDate: 3,
    //     user: {
    //       create:{
    //         username: 'roeeyn'
    //       }
    //     },
    //   },
    // },
  },
})
