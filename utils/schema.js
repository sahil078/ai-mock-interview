const { pgTable, serial, text, varchar, integer  } = require("drizzle-orm/pg-core");

export const MockInterview = pgTable('mockInterview' , {
    id:serial('id').primaryKey(),
    jsonMockRes:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),

    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    mockId: varchar('mockId').notNull(),

})

export const userAnswer = pgTable ('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef : varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    correctAnswer: text('correctAnswer'),
    userAnswer: text('userAnswer'),
    feedback: text('feedback'),
    rating: integer('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt'),
})