#1. This API must be available on a public endpoint you control 
**I hosted the api through Heroku**
[Api](https://blooming-ravine-08103.herokuapp.com/visit)
2. This API must expose the following two endpoints
    1. POST /visit
        1. Accepts POST requests with ‘application/json’ types
        2. The schema for submitted objects is as follows:
            1. userId – the user that is submitting the location
            2. name – the name of the location
            3. Returns a visitId which can be referenced in the GET. Visit IDs are globally unique to the location submission
    2. GET /visit
        1. Can be queried with either of the following patterns:
            1. visitId
              [Query api with a known visitId](https://blooming-ravine-08103.herokuapp.com/visit/17)
            2. both of the following two query params:
                1. userId
                    2. searchString- A string which is attempted to be matched over the 5 most recent locations the user has visited. The matching should be fuzzy, and case insensitive
              [Fuzzy Search by User Id](https://blooming-ravine-08103.herokuapp.com/visit?userId=abc&searchString="Poland Zealand Los")
              [Another example of Fuzzy Search](https://blooming-ravine-08103.herokuapp.com/visit?userId=abc&searchString="new Zealand atlanta")
                
        2. Returns an array of arrival objects that was submitted to the POST

Delivery:

Once you complete the API, please email me with the public endpoint and a link to a github repository of the code.
Trevor will test the endpoint after submission and report the results.

#######
Example timeline:

# Create a record with a user id and the name a store/restaurant/etc
Request: POST { userId: “user1”, name: “McDonald’s” }

Returns: { visitId: “some-visit-id-1” }


# Search for that newly created record by the returned visitId
Request: GET /visit?visitId=some-visit-id-1

Returns: [{ userId: “user1”, name: “McDonald’s”, visitId: “some-visit-id-1” }]

# Create another visit id for the same customer
Request: POST { userId: “user1”, name: “Starbucks” }

Returns: { visitId: “some-visit-id-2” }

# 
GET /visit?userId=user1&searchString="MCDONALD’S LAS VEGAS" 
McDonald’s”

Returns: [{ userId: “user1”, name: “McDonald’s”, visitId: “some-visit-id-1” }]

##########
POST { userId: “user2”, name: “Starbucks” }

Returns: { visitId: “some-visit-id-3” }

GET /visit?userId=user2&searchString=APPLE
