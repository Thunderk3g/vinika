CREATE TYPE "public"."appointment_status" AS ENUM('new', 'contacted', 'scheduled', 'closed');--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"company" text,
	"preferred_time" text,
	"goal" text,
	"source" text DEFAULT 'chat' NOT NULL,
	"status" "appointment_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
