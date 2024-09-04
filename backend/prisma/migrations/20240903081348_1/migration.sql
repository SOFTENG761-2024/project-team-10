-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" VARCHAR NOT NULL,
    "userId" VARCHAR NOT NULL,
    "bio" VARCHAR(500) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "id" SERIAL NOT NULL,
    "usertypeid" INTEGER NOT NULL,
    "institution_id" INTEGER,
    "faculty_id" INTEGER,
    "organization_id" INTEGER,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "preferred_name" VARCHAR,
    "title" VARCHAR,
    "primary_email" VARCHAR,
    "orcid_identifier" VARCHAR,
    "linkedin_url" VARCHAR,
    "secondary_email" VARCHAR,
    "mobile_phone" VARCHAR,
    "bio" TEXT,
    "research_area" TEXT,
    "skills" TEXT,
    "research_tags" TEXT,
    "expertise" TEXT,
    "tools" TEXT,
    "profile_picture" VARCHAR,
    "isscrapped" BOOLEAN,
    "signup_datetime" TIMESTAMP(6),

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institution" (
    "institution_id" SERIAL NOT NULL,
    "name" VARCHAR,
    "address" VARCHAR,

    CONSTRAINT "institution_pkey" PRIMARY KEY ("institution_id")
);

-- CreateTable
CREATE TABLE "faculty" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "address" VARCHAR,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professional_details" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "user_id" INTEGER,
    "description" TEXT,

    CONSTRAINT "professional_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "title" VARCHAR,
    "journal" VARCHAR,
    "link" VARCHAR,
    "date_published" DATE,

    CONSTRAINT "publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teaching_activity" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "user_id" INTEGER,
    "description" TEXT,

    CONSTRAINT "teaching_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_affiliations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "institution_id" INTEGER,
    "role" VARCHAR,

    CONSTRAINT "user_affiliations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usertype" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "usertype_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Profile_userId_idx" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_primary_email_key" ON "user_profile"("primary_email");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_orcid_identifier_key" ON "user_profile"("orcid_identifier");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institution"("institution_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_usertypeid_fkey" FOREIGN KEY ("usertypeid") REFERENCES "usertype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "professional_details" ADD CONSTRAINT "professional_details_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publication" ADD CONSTRAINT "publication_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teaching_activity" ADD CONSTRAINT "teaching_activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_affiliations" ADD CONSTRAINT "user_affiliations_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institution"("institution_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_affiliations" ADD CONSTRAINT "user_affiliations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
