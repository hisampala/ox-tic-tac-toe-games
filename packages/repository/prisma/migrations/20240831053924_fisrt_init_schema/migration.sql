-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_image" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "is_winner" BOOLEAN NOT NULL DEFAULT false,
    "is_combo_winner" BOOLEAN NOT NULL DEFAULT false,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "History_user_id_user_email_idx" ON "History"("user_id", "user_email");
