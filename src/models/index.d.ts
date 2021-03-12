import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum LookingForFundingEnum {
  YES = "YES",
  NO = "NO",
  FUNDED = "FUNDED"
}

export enum StageEnum {
  IDEA = "IDEA",
  BUSINESS_PLAN = "BUSINESS_PLAN",
  MVP = "MVP",
  PAYING_CUSTOMERS = "PAYING_CUSTOMERS"
}

export enum BookmarkEnum {
  SAVED = "SAVED",
  HIDDEN = "HIDDEN",
  CONTACTED = "CONTACTED"
}

export declare class S3Object {
  readonly bucket: string;
  readonly region: string;
  readonly key: string;
  constructor(init: ModelInit<S3Object>);
}

export declare class User {
  readonly id: string;
  readonly email?: string;
  readonly phone?: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly location?: string;
  readonly avatar?: S3Object;
  readonly bio?: string;
  readonly linkedIn?: string;
  readonly teams?: (TeamUserLink | null)[];
  readonly createdAt?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class TeamUserLink {
  readonly id: string;
  readonly user?: User;
  readonly team?: Team;
  readonly role?: string;
  readonly admin?: boolean;
  constructor(init: ModelInit<TeamUserLink>);
  static copyOf(source: TeamUserLink, mutator: (draft: MutableModel<TeamUserLink>) => MutableModel<TeamUserLink> | void): TeamUserLink;
}

export declare class Team {
  readonly id: string;
  readonly members?: (TeamUserLink | null)[];
  readonly startup?: Startup;
  readonly investor?: Investor;
  constructor(init: ModelInit<Team>);
  static copyOf(source: Team, mutator: (draft: MutableModel<Team>) => MutableModel<Team> | void): Team;
}

export declare class Startup {
  readonly id: string;
  readonly name?: string;
  readonly logo?: S3Object;
  readonly summary?: string;
  readonly pitch?: S3Object;
  readonly lookingForFunding?: LookingForFundingEnum | keyof typeof LookingForFundingEnum;
  readonly industriesID?: (string | null)[];
  readonly industries?: (IndustryStartupLink | null)[];
  readonly stage?: StageEnum | keyof typeof StageEnum;
  readonly capitalDemand?: number;
  readonly teamID?: string;
  readonly members?: (TeamUserLink | null)[];
  readonly channels?: (Channel | null)[];
  readonly createdAt?: string;
  constructor(init: ModelInit<Startup>);
  static copyOf(source: Startup, mutator: (draft: MutableModel<Startup>) => MutableModel<Startup> | void): Startup;
}

export declare class IndustryStartupLink {
  readonly id: string;
  readonly industry?: Industry;
  readonly startup?: Startup;
  constructor(init: ModelInit<IndustryStartupLink>);
  static copyOf(source: IndustryStartupLink, mutator: (draft: MutableModel<IndustryStartupLink>) => MutableModel<IndustryStartupLink> | void): IndustryStartupLink;
}

export declare class Industry {
  readonly id: string;
  readonly name?: string;
  readonly startups?: (IndustryStartupLink | null)[];
  readonly investors?: (IndustryInvestorLink | null)[];
  constructor(init: ModelInit<Industry>);
  static copyOf(source: Industry, mutator: (draft: MutableModel<Industry>) => MutableModel<Industry> | void): Industry;
}

export declare class IndustryInvestorLink {
  readonly id: string;
  readonly industry?: Industry;
  readonly investor?: Investor;
  constructor(init: ModelInit<IndustryInvestorLink>);
  static copyOf(source: IndustryInvestorLink, mutator: (draft: MutableModel<IndustryInvestorLink>) => MutableModel<IndustryInvestorLink> | void): IndustryInvestorLink;
}

export declare class Investor {
  readonly id: string;
  readonly name?: string;
  readonly logo?: S3Object;
  readonly summary?: string;
  readonly industriesID?: (string | null)[];
  readonly industries?: (IndustryInvestorLink | null)[];
  readonly stages?: (StageEnum | null)[] | keyof typeof StageEnum;
  readonly capitalInvestMin?: number;
  readonly capitalInvestMax?: number;
  readonly teamID?: string;
  readonly members?: (TeamUserLink | null)[];
  readonly bookmarks?: (Bookmark | null)[];
  readonly channels?: (Channel | null)[];
  readonly createdAt?: string;
  constructor(init: ModelInit<Investor>);
  static copyOf(source: Investor, mutator: (draft: MutableModel<Investor>) => MutableModel<Investor> | void): Investor;
}

export declare class Bookmark {
  readonly id: string;
  readonly investor?: Investor;
  readonly startup?: Startup;
  readonly type?: BookmarkEnum | keyof typeof BookmarkEnum;
  constructor(init: ModelInit<Bookmark>);
  static copyOf(source: Bookmark, mutator: (draft: MutableModel<Bookmark>) => MutableModel<Bookmark> | void): Bookmark;
}

export declare class Channel {
  readonly id: string;
  readonly users?: (string | null)[];
  readonly messages?: (Message | null)[];
  readonly startup?: Startup;
  readonly investor?: Investor;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Channel>);
  static copyOf(source: Channel, mutator: (draft: MutableModel<Channel>) => MutableModel<Channel> | void): Channel;
}

export declare class Message {
  readonly id: string;
  readonly sender?: User;
  readonly users?: (string | null)[];
  readonly channel?: Channel;
  readonly content?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Message>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}