import User from "@/models/User";
import connection from "@/server/connection";
import mongoose from "mongoose";
import { NextApiRequest } from "next";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcrypt'

import { sendEmail } from "@/helpers/mailer";
connection()