// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const LookingForFundingEnum = {
  "YES": "YES",
  "NO": "NO",
  "FUNDED": "FUNDED"
};

const StageEnum = {
  "IDEA": "IDEA",
  "BUSINESS_PLAN": "BUSINESS_PLAN",
  "MVP": "MVP",
  "PAYING_CUSTOMERS": "PAYING_CUSTOMERS"
};

const BookmarkEnum = {
  "SAVED": "SAVED",
  "HIDDEN": "HIDDEN",
  "CONTACTED": "CONTACTED"
};

const { User, TeamUserLink, Team, Startup, IndustryStartupLink, Industry, IndustryInvestorLink, Investor, Bookmark, Channel, Message, S3Object } = initSchema(schema);

export {
  User,
  TeamUserLink,
  Team,
  Startup,
  IndustryStartupLink,
  Industry,
  IndustryInvestorLink,
  Investor,
  Bookmark,
  Channel,
  Message,
  LookingForFundingEnum,
  StageEnum,
  BookmarkEnum,
  S3Object
};