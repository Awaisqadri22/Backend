const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
		GraphQLFloat,
    GraphQLSchema,
    GraphQLList,
		GraphQLInt,
} = require('graphql');

const CoinsType = new GraphQLObjectType({
    name:'Coins',
    fields:() => ({
        time_period_start: {type: GraphQLString},
        time_period_end: {type: GraphQLString},
        time_open: {type: GraphQLString},
        time_close: {type: GraphQLString},
        price_open: {type: GraphQLString},
        price_high: {type: GraphQLFloat},
		    price_low: {type:GraphQLFloat},
        volume_traded: {type: GraphQLFloat},
        trades_count: {type: GraphQLInt}
    })
});

const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        coins:{
            type: new GraphQLList(CoinsType),
            resolve(){
              return axios({
                method: 'GET',
                url: 'https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/history?period_id=1MIN&time_start=2016-01-01T00:00:00',
                headers: {
                'X-CoinAPI-Key':'BDFC2FE4-D2F4-465E-A85D-651B0FD1F632'
                }
              }).then(res =>res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});