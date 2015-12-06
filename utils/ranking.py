import datetime, time
from math import log

def getRank(score, created_time):
	if score < 0:
		return score

	created_timestamp = time.mktime(datetime.datetime.strptime(created_time, '%Y-%m-%d %H:%M:%S').timetuple())
	current_timestamp = int(time.time())
	time_diff = current_timestamp - created_timestamp
	new_score = log(score+1)/(time_diff/60000)
	return new_score

def orderTopComments(comments):
	sorted_comments = sorted(comments, key=lambda x: getRank(int(x["score"]), x["created_timestamp"]), reverse=True)
	return sorted_comments

def orderTopPosts(posts):
	sorted_posts = sorted(posts, key=lambda x: getRank(int(x["score"]), x["created_timestamp"]), reverse=True)
	return sorted_posts