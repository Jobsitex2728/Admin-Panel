/* eslint-disable @typescript-eslint/no-explicit-any */
export const db = {
    "dashboard": {
        "stats": {
            "activeJobs": {
                "value": 82,
                "trend": 15,
                "trendType": "YoY"
            },
            "onlineDrivers": {
                "value": 25,
                "total": 50,
                "trend": 15,
                "trendType": "MoM"
            },
            "totalJobs": {
                "value": 2488,
                "trend": 15,
                "trendType": "YoY"
            },
            "totalRevenue": {
                "value": 84200,
                "trend": 15,
                "trendType": "YoY"
            }
        },
        "userGrowth": {
            "total": 1082,
            "newJoiners": 500,
            "growth": 15,
            "trendType": "YoY",
            "lastMonthSummary": {
                "label": "Last Month Summary",
                "value": 9488,
                "trend": 15,
                "trendType": "YoY"
            },
            "timeFilters": [
                "Daily",
                "Weekly",
                "Monthly",
                "Yearly"
            ],
            "userFilters": [
                "New",
                "Old"
            ],
            "monthlyData": [
                {
                    "month": "Feb",
                    "old": 10,
                    "new": 100
                },
                {
                    "month": "Mar",
                    "old": 200,
                    "new": 80
                },
                {
                    "month": "Apr",
                    "old": 280,
                    "new": 300
                },
                {
                    "month": "May",
                    "old": 175,
                    "new": 400
                },
                {
                    "month": "Jun",
                    "old": 400,
                    "new": 150
                },
                {
                    "month": "Jul",
                    "old": 100,
                    "new": 250
                },
                {
                    "month": "Aug",
                    "old": 300,
                    "new": 200
                },
                {
                    "month": "Sep",
                    "old": 300,
                    "new": 400
                },
                {
                    "month": "Oct",
                    "old": 400,
                    "new": 200
                },
                {
                    "month": "Nov",
                    "old": 300,
                    "new": 400
                },
                {
                    "month": "Dec",
                    "old": 400,
                    "new": 800
                }
            ]
        },
        "recentActivity": [
            {
                "id": 1,
                "type": "delivered",
                "load": "#8291",
                "description": "Delivered",
                "driver": "Mike Ross",
                "location": "Chicago, IL",
                "time": "2m ago"
            },
            {
                "id": 2,
                "type": "delay",
                "title": "Driver Delayed",
                "load": "#8300",
                "description": "Traffic on I-95",
                "time": "12m ago"
            },
            {
                "id": 3,
                "type": "payment",
                "title": "Payment Processed",
                "invoice": "INV-2023",
                "time": "15m ago"
            },
            {
                "id": 4,
                "type": "delivered",
                "load": "#8291",
                "description": "Delivered",
                "driver": "Mike Ross",
                "location": "Chicago, IL",
                "time": "9m ago"
            }
        ],
        "quickActions": [
            {
                "id": 1,
                "label": "New Load",
                "icon": "package"
            },
            {
                "id": 2,
                "label": "New Load",
                "icon": "package"
            }
        ]
    },
    "jobs": [
        {
            "id": "1",
            "jobId": "#LOG-8492",
            "customer": {
                "name": "Acme Logistics",
                "email": "hello@acme.com"
            },
            "truckType": "Dry Van",
            "loadType": "Single Load",
            "date": "2024-03-15",
            "status": "Delivered",
            "blocked": false
        },
        {
            "id": "2",
            "jobId": "#LOG-8477",
            "customer": {
                "name": "Global Freight Solutions",
                "email": "dispatch@globalfreight.com"
            },
            "truckType": "Multi-stop",
            "loadType": "Multi-stop",
            "date": "2024-03-14",
            "status": "Delivered",
            "blocked": true
        },
        {
            "id": "3",
            "jobId": "#LOG-8749",
            "customer": {
                "name": "FastTrans Inc.",
                "email": "operations@fasttrans.com"
            },
            "truckType": "Box Truck",
            "loadType": "Single Load",
            "date": "2024-03-16",
            "status": "Pending",
            "blocked": false
        },
        {
            "id": "4",
            "jobId": "#LOG-8445",
            "customer": {
                "name": "Metro Delivery Services",
                "email": "support@metrodelivery.com"
            },
            "truckType": "Dry Van",
            "loadType": "Multi-stop",
            "date": "2024-03-15",
            "status": "In Transit",
            "blocked": false
        },
        {
            "id": "5",
            "jobId": "#LOG-4847",
            "customer": {
                "name": "Global Freight Solutions",
                "email": "coordinator@globalfreight.com"
            },
            "truckType": "Box Truck",
            "loadType": "Multi-stop",
            "date": "2024-03-13",
            "status": "Dispatching",
            "blocked": true
        },
        {
            "id": "6",
            "jobId": "#LOG-6858",
            "customer": {
                "name": "Pioneer Trucking",
                "email": "billing@pioneertruck.com"
            },
            "truckType": "Box Truck",
            "loadType": "Single Load",
            "date": "2024-03-12",
            "status": "Delivered",
            "blocked": false
        },
        {
            "id": "7",
            "jobId": "#LOG-8253",
            "customer": {
                "name": "Metro Delivery Services",
                "email": "dispatcher@metrodelivery.com"
            },
            "truckType": "Box Truck",
            "loadType": "Multi-stop",
            "date": "2024-03-14",
            "status": "Delivered",
            "blocked": true
        },
        {
            "id": "8",
            "jobId": "#LOG-4789",
            "customer": {
                "name": "Metro Delivery Services",
                "email": "scheduling@metrodelivery.com"
            },
            "truckType": "Box Truck",
            "loadType": "Multi-stop",
            "date": "2024-03-10",
            "status": "In Transit",
            "blocked": false
        },
        {
            "id": "9",
            "jobId": "#LOG-9123",
            "customer": {
                "name": "Sunrise Transport",
                "email": "info@sunrisetransport.com"
            },
            "truckType": "Dry Van",
            "loadType": "Single Load",
            "date": "2024-03-16",
            "status": "Pending",
            "blocked": false
        },
        {
            "id": "10",
            "jobId": "#LOG-4567",
            "customer": {
                "name": "Coastline Carriers",
                "email": "dispatch@coastline.com"
            },
            "truckType": "Multi-stop",
            "loadType": "Multi-stop",
            "date": "2024-03-11",
            "status": "Paused",
            "blocked": true
        },
        {
            "id": "11",
            "jobId": "#LOG-3344",
            "customer": {
                "name": "Express Line Logistics",
                "email": "ops@expressline.com"
            },
            "truckType": "Box Truck",
            "loadType": "Single Load",
            "date": "2024-03-09",
            "status": "Delivered",
            "blocked": false
        },
        {
            "id": "12",
            "jobId": "#LOG-7788",
            "customer": {
                "name": "Acme Logistics",
                "email": "shipping@acme.com"
            },
            "truckType": "Dry Van",
            "loadType": "Multi-stop",
            "date": "2024-03-13",
            "status": "In Transit",
            "blocked": false
        },
        {
            "id": "13",
            "jobId": "#LOG-9900",
            "customer": {
                "name": "Rapid Freight Systems",
                "email": "customerservice@rapidfreight.com"
            },
            "truckType": "Multi-stop",
            "loadType": "Multi-stop",
            "date": "2024-03-08",
            "status": "Delivered",
            "blocked": true
        },
        {
            "id": "14",
            "jobId": "#LOG-2233",
            "customer": {
                "name": "Pioneer Trucking",
                "email": "logistics@pioneertruck.com"
            },
            "truckType": "Box Truck",
            "loadType": "Single Load",
            "date": "2024-03-15",
            "status": "Dispatching",
            "blocked": false
        },
        {
            "id": "15",
            "jobId": "#LOG-5566",
            "customer": {
                "name": "Global Freight Solutions",
                "email": "tracking@globalfreight.com"
            },
            "truckType": "Dry Van",
            "loadType": "Single Load",
            "date": "2024-03-07",
            "status": "Pending",
            "blocked": false
        },
        {
            "id": "16",
            "jobId": "#LOG-6677",
            "customer": {
                "name": "Sunrise Transport",
                "email": "billing@sunrisetransport.com"
            },
            "truckType": "Box Truck",
            "loadType": "Multi-stop",
            "date": "2024-03-12",
            "status": "In Transit",
            "blocked": true
        }
    ],
    "drivers": {
        "list": [
            {
                "id": "drv-8821",
                "driverId": "#DRV-8821",
                "name": "John Doe",
                "truckAssigned": {
                    "model": "Volvo FH16",
                    "type": "Refrigerated Van",
                    "licensePlate": "#TRK-D01",
                    "isAssigned": true
                },
                "phoneNumber": "(217) 555-0113",
                "availability": "Online",
                "status": "Verified",
                "rating": 4.8,
                "joinedDate": "2023-03-15",
                "avatar": "/avatars/john-doe.jpg",
                "blocked": false
            },
            {
                "id": "drv-8815",
                "driverId": "#DRV-8815",
                "name": "Alex Carter",
                "truckAssigned": {
                    "model": "Scania R-series",
                    "type": "Heavy Duty",
                    "licensePlate": "#TRK-002",
                    "isAssigned": true
                },
                "phoneNumber": "(205) 555-0100",
                "availability": "Online",
                "status": "Verified",
                "rating": 4.9,
                "joinedDate": "2023-05-20",
                "avatar": "/avatars/alex-carter.jpg",
                "blocked": false
            },
            {
                "id": "drv-8845",
                "driverId": "#DRV-8845",
                "name": "Mia Johnson",
                "truckAssigned": {
                    "model": "Mercedes Actros",
                    "type": "Heavy Duty",
                    "licensePlate": "#TRK-003",
                    "isAssigned": true
                },
                "phoneNumber": "(229) 555-0109",
                "availability": "Offline",
                "status": "Pending",
                "rating": 0,
                "joinedDate": "2024-01-10",
                "avatar": "/avatars/mia-johnson.jpg",
                "blocked": false
            },
            {
                "id": "drv-8846",
                "driverId": "#DRV-8846",
                "name": "Liam Evans",
                "truckAssigned": {
                    "model": "Mercedes Actros",
                    "type": "Heavy Duty",
                    "licensePlate": "#TRK-004",
                    "isAssigned": true
                },
                "phoneNumber": "(201) 555-0124",
                "availability": "Online",
                "status": "Verified",
                "rating": 4.7,
                "joinedDate": "2023-08-15",
                "avatar": "/avatars/liam-evans.jpg",
                "blocked": false
            },
            {
                "id": "drv-8847",
                "driverId": "#DRV-8847",
                "name": "John Doe",
                "truckAssigned": {
                    "model": "Mercedes Actros",
                    "type": "Heavy Duty",
                    "licensePlate": "#TRK-005",
                    "isAssigned": true
                },
                "phoneNumber": "(480) 555-0103",
                "availability": "Online",
                "status": "Rejected",
                "rating": 2.5,
                "joinedDate": "2024-02-01",
                "avatar": "/avatars/john-doe-2.jpg",
                "blocked": false
            },
            {
                "id": "drv-8848",
                "driverId": "#DRV-8848",
                "name": "Alex Carter",
                "truckAssigned": {
                    "model": "MAN TGX",
                    "type": "Heavy Duty",
                    "licensePlate": "#TRK-006",
                    "isAssigned": true
                },
                "phoneNumber": "(505) 555-0125",
                "availability": "Online",
                "status": "Verified",
                "rating": 4.8,
                "joinedDate": "2023-11-20",
                "avatar": "/avatars/alex-carter-2.jpg",
                "blocked": true
            },
            {
                "id": "drv-8849",
                "driverId": "#DRV-8849",
                "name": "Mia Johnson",
                "truckAssigned": {
                    "model": "Unassigned",
                    "type": "Flatbed",
                    "licensePlate": "#TRK-102",
                    "isAssigned": false
                },
                "phoneNumber": "(270) 555-0117",
                "availability": "Online",
                "status": "Verified",
                "rating": 4.6,
                "joinedDate": "2023-09-05",
                "avatar": "/avatars/mia-johnson-2.jpg",
                "blocked": false
            }
        ],
        "pagination": {
            "currentPage": 1,
            "totalPages": 1,
            "totalItems": 7,
            "pageSize": 10,
            "hasNext": false,
            "hasPrevious": false
        }
    },
    "driverProfiles": {
        "drv-8821": {
            "id": "drv-8821",
            "personalInfo": {
                "name": "Bessie Lora",
                "driverId": "#DRV-8821",
                "email": "m.bessies@logistics-com",
                "phoneNumber": "+1 (555) 012-3456",
                "joinedDate": "March 2019",
                "rating": 4.9,
                "avatar": "/avatars/bessie-lora.jpg",
                "address": {
                    "street": "123 Main St",
                    "city": "Los Angeles",
                    "state": "CA",
                    "zipCode": "90001",
                    "country": "USA"
                }
            },
            "stats": {
                "totalDistance": 15420,
                "jobsCompleted": 450,
                "estimatedDuration": 4.5,
                "averageRating": 4.8,
                "totalEarnings": 45600
            },
            "assignedVehicle": {
                "id": "veh-001",
                "model": "Volvo FH16",
                "type": "Refrigerated Van",
                "licensePlate": "#TRK-D01",
                "year": 2022,
                "images": [
                    {
                        "id": "img-001",
                        "url": "/vehicles/volvo-fh16-1.jpg",
                        "isPrimary": true
                    }
                ],
                "specifications": {
                    "truckType": "Dump Truck",
                    "payloadCapacity": "10 Tons",
                    "axleCount": 2,
                    "hourlyRate": 200,
                    "fuelType": "Diesel",
                    "transmission": "Automatic"
                }
            },
            "jobHistory": [
                {
                    "jobId": "#JOB-1024",
                    "date": "2024-02-15",
                    "route": {
                        "from": "New York",
                        "to": "Boston"
                    },
                    "amount": 450,
                    "status": "Delivered",
                    "distance": 215,
                    "duration": "4.5 hours"
                },
                {
                    "jobId": "#JOB-1021",
                    "date": "2024-02-10",
                    "route": {
                        "from": "Chicago",
                        "to": "Detroit"
                    },
                    "amount": 820,
                    "status": "Delivered",
                    "distance": 282,
                    "duration": "5 hours"
                },
                {
                    "jobId": "#JOB-1022",
                    "date": "2024-02-05",
                    "route": {
                        "from": "Miami",
                        "to": "Orlando"
                    },
                    "amount": 750,
                    "status": "Canceled",
                    "distance": 235,
                    "duration": "4 hours"
                },
                {
                    "jobId": "#JOB-1023",
                    "date": "2024-01-28",
                    "route": {
                        "from": "San Francisco",
                        "to": "Los Angeles"
                    },
                    "amount": 680,
                    "status": "Delivered",
                    "distance": 380,
                    "duration": "6.2 hours"
                },
                {
                    "jobId": "#JOB-1025",
                    "date": "2024-01-20",
                    "route": {
                        "from": "Seattle",
                        "to": "Portland"
                    },
                    "amount": 320,
                    "status": "Delivered",
                    "distance": 175,
                    "duration": "3 hours"
                }
            ],
            "ratings": {
                "average": 4.8,
                "totalCount": 124,
                "reviews": [
                    {
                        "id": "rev-001",
                        "reviewerName": "John Doe",
                        "reviewerAvatar": "/avatars/john-doe.jpg",
                        "rating": 4,
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
                        "date": "2024-02-15",
                        "jobId": "#JOB-1024"
                    },
                    {
                        "id": "rev-002",
                        "reviewerName": "Alex Carter",
                        "reviewerAvatar": "/avatars/alex-carter.jpg",
                        "rating": 5,
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
                        "date": "2024-02-10",
                        "jobId": "#JOB-1021"
                    },
                    {
                        "id": "rev-003",
                        "reviewerName": "Michael Smith",
                        "reviewerAvatar": "/avatars/michael-smith.jpg",
                        "rating": 5,
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
                        "date": "2024-02-05",
                        "jobId": "#JOB-1023"
                    },
                    {
                        "id": "rev-004",
                        "reviewerName": "Sarah Johnson",
                        "reviewerAvatar": "/avatars/sarah-johnson.jpg",
                        "rating": 4,
                        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        "date": "2024-01-28",
                        "jobId": "#JOB-1025"
                    }
                ]
            },
            "adminControls": {
                "canSuspend": true,
                "canViewDocuments": true,
                "canApproveDocuments": true,
                "currentStatus": "Active"
            }
        }
    },
    "driverDocuments": {
        "drv-8821": {
            "driverId": "drv-8821",
            "driverName": "Bessie Lora",
            "documents": [
                {
                    "id": "doc-001",
                    "type": "License",
                    "documentNumber": "D8829-192-38",
                    "expirationDate": "12/04/2026",
                    "stateOfIssue": "California (CA)",
                    "imageUrl": "/documents/license-db829.jpg",
                    "status": "Pending",
                    "uploadedAt": "2024-01-15T10:30:00Z",
                    "history": [
                        {
                            "id": "hist-001",
                            "action": "Upload",
                            "performedBy": "Bessie Lora",
                            "performedAt": "2024-01-15T10:30:00Z",
                            "comments": "Initial upload"
                        },
                        {
                            "id": "hist-002",
                            "action": "Request Re-upload",
                            "performedBy": "Admin",
                            "performedAt": "2024-01-16T14:20:00Z",
                            "comments": "Image too blurry, please upload clearer photo"
                        }
                    ]
                },
                {
                    "id": "doc-002",
                    "type": "Insurance",
                    "documentNumber": "INS-83742-23",
                    "expirationDate": "08/15/2025",
                    "stateOfIssue": "California (CA)",
                    "imageUrl": "/documents/insurance-83742.jpg",
                    "status": "Approved",
                    "uploadedAt": "2024-01-10T09:15:00Z",
                    "reviewedAt": "2024-01-12T11:30:00Z",
                    "history": [
                        {
                            "id": "hist-003",
                            "action": "Upload",
                            "performedBy": "Bessie Lora",
                            "performedAt": "2024-01-10T09:15:00Z"
                        },
                        {
                            "id": "hist-004",
                            "action": "Approve",
                            "performedBy": "Admin",
                            "performedAt": "2024-01-12T11:30:00Z"
                        }
                    ]
                },
                {
                    "id": "doc-003",
                    "type": "Registration",
                    "documentNumber": "REG-78432-CA",
                    "expirationDate": "03/22/2025",
                    "stateOfIssue": "California (CA)",
                    "imageUrl": "/documents/registration-78432.jpg",
                    "status": "Approved",
                    "uploadedAt": "2024-01-05T13:45:00Z",
                    "reviewedAt": "2024-01-07T10:20:00Z",
                    "history": [
                        {
                            "id": "hist-005",
                            "action": "Upload",
                            "performedBy": "Bessie Lora",
                            "performedAt": "2024-01-05T13:45:00Z"
                        },
                        {
                            "id": "hist-006",
                            "action": "Approve",
                            "performedBy": "Admin",
                            "performedAt": "2024-01-07T10:20:00Z"
                        }
                    ]
                }
            ],
            "verificationSteps": [
                {
                    "id": 1,
                    "name": "Background Check",
                    "status": "Completed",
                    "date": "Oct 17, 2023",
                    "details": "Passed"
                },
                {
                    "id": 2,
                    "name": "Document Review",
                    "status": "Pending",
                    "details": "Awaiting admin decision"
                },
                {
                    "id": 3,
                    "name": "Vehicle Inspection",
                    "status": "Action Required",
                    "details": "Pre-deposit greenhouse stock",
                    "assignedTo": "Supervisor"
                },
                {
                    "id": 4,
                    "name": "In Transit",
                    "status": "Action Required",
                    "details": "Super action required",
                    "assignedTo": "Admin"
                }
            ],
            "adminControls": {
                "canApprove": true,
                "canRequestReupload": true,
                "canViewHistory": true,
                "historyCount": 2
            }
        }
    },
    "trucks": {
        "trk-d01": {
            "id": "trk-d01",
            "model": "Volvo FH16",
            "type": "Dump Truck",
            "licensePlate": "#TRK-D01",
            "year": 2022,
            "images": [
                {
                    "id": "img-001",
                    "url": "/trucks/volvo-fh16-1.jpg",
                    "isPrimary": true
                }
            ],
            "specifications": {
                "truckType": "Dump Truck",
                "payloadCapacity": "10 Tons",
                "axleCount": 2,
                "hourlyRate": 200
            }
        },
        "trk-002": {
            "id": "trk-002",
            "model": "Scania R-series",
            "type": "Heavy Duty",
            "licensePlate": "#TRK-002",
            "year": 2021,
            "images": [
                {
                    "id": "img-002",
                    "url": "/trucks/scania-r.jpg",
                    "isPrimary": true
                }
            ],
            "specifications": {
                "truckType": "Heavy Duty Truck",
                "payloadCapacity": "20 Tons",
                "axleCount": 3,
                "hourlyRate": 350
            }
        }
    }
}

export interface DbSchema {
  drivers: {
    list: any[];
  };
  driverProfiles: Record<string, any>;
  driverDocuments: Record<string, any>;
  jobs?: any[];
  dashboard?: any;
}