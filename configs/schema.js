const { pgTable, serial, text, varchar, integer, boolean, json } = require("drizzle-orm/pg-core");

export const ResumeTemplates = pgTable('resumeTemplates', {
    id: serial('id').primaryKey(),
    jsonform: text('jsonform').notNull(),
    name: varchar('name').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt').notNull(),
    enabledSignIn: boolean('enabledSignIn').default(false),
});

export const UserProfiles = pgTable('userProfiles', {
    id: serial('id').primaryKey(),
    userId: varchar('userId').notNull(),
    firstName: varchar('firstName').notNull(),
    lastName: varchar('lastName').notNull(),
    email: varchar('email').notNull(),
    phone: varchar('phone'),
    address: text('address'),
    profilePicture: varchar('profilePicture'),
    createdAt: varchar('createdAt').notNull(),
    updatedAt: varchar('updatedAt').notNull(),
});

export const ResumeResponses = pgTable('resumeResponses', {
    id: serial('id').primaryKey(),
    jsonResponse: text('jsonResponse').notNull(),
    userId: integer('userId').references(() => UserProfiles.id),
    templateId: integer('templateId').references(() => ResumeTemplates.id),
    createdAt: varchar('createdAt').notNull(),
    updatedAt: varchar('updatedAt').notNull(),
});

export const GeneratedResumes = pgTable('generatedResumes', {
    id: serial('id').primaryKey(),
    fileName: varchar('fileName').notNull(),
    fileType: varchar('fileType').notNull(),
    filePath: varchar('filePath').notNull(),
    userId: integer('userId').references(() => UserProfiles.id),
    templateId: integer('templateId').references(() => ResumeTemplates.id),
    createdAt: varchar('createdAt').notNull(),
    updatedAt: varchar('updatedAt').notNull(),
});

export const ResumeSections = pgTable('resumeSections', {
    id: serial('id').primaryKey(),
    sectionName: varchar('sectionName').notNull(),
    sectionContent: text('sectionContent').notNull(),
    resumeResponseId: integer('resumeResponseId').references(() => ResumeResponses.id),
    createdAt: varchar('createdAt').notNull(),
    updatedAt: varchar('updatedAt').notNull(),
});

export const ResumePreferences = pgTable('resumePreferences', {
    id: serial('id').primaryKey(),
    userId: integer('userId').references(() => UserProfiles.id),
    tone: varchar('tone'),
    language: varchar('language'),
    style: varchar('style'),
    createdAt: varchar('createdAt').notNull(),
    updatedAt: varchar('updatedAt').notNull(),
});

export const CoverLetters = pgTable('coverLetters', {
    id: serial('id').primaryKey(),
    letterContent: text('letterContent').notNull(),
    userId: integer('userId').references(() => UserProfiles.id),
    createdAt: varchar('createdAt').notNull(),
    updatedAt: varchar('updatedAt').notNull(),
});
