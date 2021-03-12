export const schema = {
    "models": {
        "User": {
            "name": "User",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "AWSEmail",
                    "isRequired": false,
                    "attributes": []
                },
                "phone": {
                    "name": "phone",
                    "isArray": false,
                    "type": "AWSPhone",
                    "isRequired": false,
                    "attributes": []
                },
                "firstname": {
                    "name": "firstname",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "lastname": {
                    "name": "lastname",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location": {
                    "name": "location",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "avatar": {
                    "name": "avatar",
                    "isArray": false,
                    "type": {
                        "nonModel": "S3Object"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "bio": {
                    "name": "bio",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "linkedIn": {
                    "name": "linkedIn",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "teams": {
                    "name": "teams",
                    "isArray": true,
                    "type": {
                        "model": "TeamUserLink"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "user"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Users",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "subscriptions": null
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "getUserByEmail",
                        "fields": [
                            "email"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "id",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ],
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        },
        "TeamUserLink": {
            "name": "TeamUserLink",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "user": {
                    "name": "user",
                    "isArray": false,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "userID"
                    }
                },
                "team": {
                    "name": "team",
                    "isArray": false,
                    "type": {
                        "model": "Team"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "teamID"
                    }
                },
                "role": {
                    "name": "role",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "admin": {
                    "name": "admin",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "TeamUserLinks",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "mutations": null,
                        "subscriptions": null
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "usersByTeam",
                        "fields": [
                            "teamID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "teamsByUser",
                        "fields": [
                            "userID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ],
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        },
        "Team": {
            "name": "Team",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "members": {
                    "name": "members",
                    "isArray": true,
                    "type": {
                        "model": "TeamUserLink"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "team"
                    }
                },
                "startup": {
                    "name": "startup",
                    "isArray": false,
                    "type": {
                        "model": "Startup"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "startupID"
                    }
                },
                "investor": {
                    "name": "investor",
                    "isArray": false,
                    "type": {
                        "model": "Investor"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "investorID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Teams",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "mutations": null,
                        "subscriptions": null
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ],
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        },
        "Startup": {
            "name": "Startup",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "logo": {
                    "name": "logo",
                    "isArray": false,
                    "type": {
                        "nonModel": "S3Object"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "summary": {
                    "name": "summary",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "pitch": {
                    "name": "pitch",
                    "isArray": false,
                    "type": {
                        "nonModel": "S3Object"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "lookingForFunding": {
                    "name": "lookingForFunding",
                    "isArray": false,
                    "type": {
                        "enum": "LookingForFundingEnum"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "industriesID": {
                    "name": "industriesID",
                    "isArray": true,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "industries": {
                    "name": "industries",
                    "isArray": true,
                    "type": {
                        "model": "IndustryStartupLink"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "startup"
                    }
                },
                "stage": {
                    "name": "stage",
                    "isArray": false,
                    "type": {
                        "enum": "StageEnum"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "capitalDemand": {
                    "name": "capitalDemand",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "teamID": {
                    "name": "teamID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "members": {
                    "name": "members",
                    "isArray": true,
                    "type": {
                        "model": "TeamUserLink"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "team"
                    }
                },
                "channels": {
                    "name": "channels",
                    "isArray": true,
                    "type": {
                        "model": "Channel"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "startup"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Startups",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "mutations": null,
                        "subscriptions": null
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "startupsLookingForFunding",
                        "fields": [
                            "lookingForFunding",
                            "createdAt"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ],
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        },
        "IndustryStartupLink": {
            "name": "IndustryStartupLink",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "industry": {
                    "name": "industry",
                    "isArray": false,
                    "type": {
                        "model": "Industry"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "industryID"
                    }
                },
                "startup": {
                    "name": "startup",
                    "isArray": false,
                    "type": {
                        "model": "Startup"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "startupID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "IndustryStartupLinks",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "queries": null,
                        "mutations": null,
                        "subscriptions": null
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "startupsByIndustry",
                        "fields": [
                            "industryID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "industriesByStartup",
                        "fields": [
                            "startupID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Industry": {
            "name": "Industry",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "startups": {
                    "name": "startups",
                    "isArray": true,
                    "type": {
                        "model": "IndustryStartupLink"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "industry"
                    }
                },
                "investors": {
                    "name": "investors",
                    "isArray": true,
                    "type": {
                        "model": "IndustryInvestorLink"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "industry"
                    }
                }
            },
            "syncable": true,
            "pluralName": "Industries",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "subscriptions": null
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ],
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        },
        "IndustryInvestorLink": {
            "name": "IndustryInvestorLink",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "industry": {
                    "name": "industry",
                    "isArray": false,
                    "type": {
                        "model": "Industry"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "industryID"
                    }
                },
                "investor": {
                    "name": "investor",
                    "isArray": false,
                    "type": {
                        "model": "Investor"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "investorID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "IndustryInvestorLinks",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "queries": null,
                        "mutations": null,
                        "subscriptions": null
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "investorsByIndustry",
                        "fields": [
                            "industryID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "industriesByInvestor",
                        "fields": [
                            "investorID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Investor": {
            "name": "Investor",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "logo": {
                    "name": "logo",
                    "isArray": false,
                    "type": {
                        "nonModel": "S3Object"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "summary": {
                    "name": "summary",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "industriesID": {
                    "name": "industriesID",
                    "isArray": true,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "industries": {
                    "name": "industries",
                    "isArray": true,
                    "type": {
                        "model": "IndustryInvestorLink"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "investor"
                    }
                },
                "stages": {
                    "name": "stages",
                    "isArray": true,
                    "type": {
                        "enum": "StageEnum"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "capitalInvestMin": {
                    "name": "capitalInvestMin",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "capitalInvestMax": {
                    "name": "capitalInvestMax",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "teamID": {
                    "name": "teamID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "members": {
                    "name": "members",
                    "isArray": true,
                    "type": {
                        "model": "TeamUserLink"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "team"
                    }
                },
                "bookmarks": {
                    "name": "bookmarks",
                    "isArray": true,
                    "type": {
                        "model": "Bookmark"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "investor"
                    }
                },
                "channels": {
                    "name": "channels",
                    "isArray": true,
                    "type": {
                        "model": "Channel"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "investor"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Investors",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "mutations": null,
                        "subscriptions": null
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "allow": "public",
                                "operations": [
                                    "read"
                                ],
                                "provider": "iam"
                            }
                        ]
                    }
                }
            ]
        },
        "Bookmark": {
            "name": "Bookmark",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "investor": {
                    "name": "investor",
                    "isArray": false,
                    "type": {
                        "model": "Investor"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "investorID"
                    }
                },
                "startup": {
                    "name": "startup",
                    "isArray": false,
                    "type": {
                        "model": "Startup"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "startupID"
                    }
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "BookmarkEnum"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Bookmarks",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "mutations": null
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bookmarksByInvestor",
                        "fields": [
                            "investorID"
                        ]
                    }
                }
            ]
        },
        "Channel": {
            "name": "Channel",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "users": {
                    "name": "users",
                    "isArray": true,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "messages": {
                    "name": "messages",
                    "isArray": true,
                    "type": {
                        "model": "Message"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "channel"
                    }
                },
                "startup": {
                    "name": "startup",
                    "isArray": false,
                    "type": {
                        "model": "Startup"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "startupID"
                    }
                },
                "investor": {
                    "name": "investor",
                    "isArray": false,
                    "type": {
                        "model": "Investor"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "investorID"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Channels",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "mutations": null
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "channelsByStartup",
                        "fields": [
                            "startupID",
                            "createdAt"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "channelsByInvestor",
                        "fields": [
                            "investorID",
                            "createdAt"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "users",
                                "allow": "owner",
                                "operations": [
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            }
                        ]
                    }
                }
            ]
        },
        "Message": {
            "name": "Message",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "sender": {
                    "name": "sender",
                    "isArray": false,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "senderID"
                    }
                },
                "users": {
                    "name": "users",
                    "isArray": true,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "channel": {
                    "name": "channel",
                    "isArray": false,
                    "type": {
                        "model": "Channel"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "channelID"
                    }
                },
                "content": {
                    "name": "content",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Messages",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "mutations": {
                            "create": null
                        }
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "messagesByChannel",
                        "fields": [
                            "channelID",
                            "createdAt"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "sender",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "users",
                                "allow": "owner",
                                "operations": [
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "LookingForFundingEnum": {
            "name": "LookingForFundingEnum",
            "values": [
                "YES",
                "NO",
                "FUNDED"
            ]
        },
        "StageEnum": {
            "name": "StageEnum",
            "values": [
                "IDEA",
                "BUSINESS_PLAN",
                "MVP",
                "PAYING_CUSTOMERS"
            ]
        },
        "BookmarkEnum": {
            "name": "BookmarkEnum",
            "values": [
                "SAVED",
                "HIDDEN",
                "CONTACTED"
            ]
        }
    },
    "nonModels": {
        "S3Object": {
            "name": "S3Object",
            "fields": {
                "bucket": {
                    "name": "bucket",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "region": {
                    "name": "region",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "key": {
                    "name": "key",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "version": "d9c85a68e47c2e94a6b43f615ae487b8"
};