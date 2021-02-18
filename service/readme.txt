Search Geo-index based social network	
1. Built a scalable web service in Go to handle posts and deployed to Google Cloud (GAE flex) for better scaling
1. Utilized ElasticSearch (GCE) to provide geo-location based search functions such that users can search nearby posts within a distance (e.g. 200km)
3. Used Google Dataflow to implement a daily dump of posts to BigQuery table for offline analysis.
4. Aggregated the data at the post level and user level to improve the keyword based spam detection (BigQuery).

