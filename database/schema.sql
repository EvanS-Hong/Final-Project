set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Users" (
	"UserID" serial NOT NULL,
	"Name" serial NOT NULL UNIQUE,
	"Password" TEXT NOT NULL,
	"Role" TEXT NOT NULL,
	"Latitude" DECIMAL NOT NULL,
	"Longitude" DECIMAL NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("UserID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Locations" (
	"LocationID" serial NOT NULL,
	"Country" serial NOT NULL,
	"Region" TEXT NOT NULL,
	"Longitude" DECIMAL NOT NULL,
	"Latitude" DECIMAL NOT NULL,
	"Name" TEXT NOT NULL,
	"Description" TEXT NOT NULL,
	CONSTRAINT "Locations_pk" PRIMARY KEY ("LocationID")
) WITH (
  OIDS=FALSE
);
