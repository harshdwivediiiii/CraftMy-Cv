CREATE TABLE "coverLetters" (
	"id" serial PRIMARY KEY NOT NULL,
	"letterContent" text NOT NULL,
	"userId" integer,
	"createdAt" varchar NOT NULL,
	"updatedAt" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generatedResumes" (
	"id" serial PRIMARY KEY NOT NULL,
	"fileName" varchar NOT NULL,
	"fileType" varchar NOT NULL,
	"filePath" varchar NOT NULL,
	"userId" integer,
	"templateId" integer,
	"createdAt" varchar NOT NULL,
	"updatedAt" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resumePreferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer,
	"tone" varchar,
	"language" varchar,
	"style" varchar,
	"createdAt" varchar NOT NULL,
	"updatedAt" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resumeResponses" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonResponse" text NOT NULL,
	"userId" integer,
	"templateId" integer,
	"createdAt" varchar NOT NULL,
	"updatedAt" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resumeSections" (
	"id" serial PRIMARY KEY NOT NULL,
	"sectionName" varchar NOT NULL,
	"sectionContent" text NOT NULL,
	"resumeResponseId" integer,
	"createdAt" varchar NOT NULL,
	"updatedAt" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resumeTemplates" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonform" text NOT NULL,
	"name" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"createdAt" varchar NOT NULL,
	"enabledSignIn" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "userProfiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" varchar NOT NULL,
	"firstName" varchar NOT NULL,
	"lastName" varchar NOT NULL,
	"email" varchar NOT NULL,
	"phone" varchar,
	"address" text,
	"profilePicture" varchar,
	"createdAt" varchar NOT NULL,
	"updatedAt" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "coverLetters" ADD CONSTRAINT "coverLetters_userId_userProfiles_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userProfiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generatedResumes" ADD CONSTRAINT "generatedResumes_userId_userProfiles_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userProfiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generatedResumes" ADD CONSTRAINT "generatedResumes_templateId_resumeTemplates_id_fk" FOREIGN KEY ("templateId") REFERENCES "public"."resumeTemplates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumePreferences" ADD CONSTRAINT "resumePreferences_userId_userProfiles_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userProfiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumeResponses" ADD CONSTRAINT "resumeResponses_userId_userProfiles_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."userProfiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumeResponses" ADD CONSTRAINT "resumeResponses_templateId_resumeTemplates_id_fk" FOREIGN KEY ("templateId") REFERENCES "public"."resumeTemplates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resumeSections" ADD CONSTRAINT "resumeSections_resumeResponseId_resumeResponses_id_fk" FOREIGN KEY ("resumeResponseId") REFERENCES "public"."resumeResponses"("id") ON DELETE no action ON UPDATE no action;