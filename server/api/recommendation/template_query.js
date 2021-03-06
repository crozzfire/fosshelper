exports.query = {
	query:{
  		filtered: {
			query: {
				multi_match : {
				    query:    "{{skills}}", 
				    fields: [ "description^2", "name^2", "readme","language^3" ] 
				}
			},
			filter: {
				range: {
					"watchers":{
						gte: "{{watchers}}"
					},
					"forks": {
						gte: "{{forks}}"
					},
					"open_issues": {
						gte: "{{issues}}"
					}		
				}		
			}
		}
	},
	size : 50,
	highlight : {
        fields : {
            "description" : {},
            "name" : {},
            "language" : {},
            "readme" : {}
        }
    },
	sort: { 
		"updated_at": 
			{ "order": "desc" }
		}
}
