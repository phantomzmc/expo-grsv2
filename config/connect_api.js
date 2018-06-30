// import axios from 'axios'
// import req from '../config/uri_req'
// import { connect } from 'react-redux'

// const ConnectAPI => {
//     componentWillMount() {
//         let uri = req[0].session_token;
//         return axios.post(uri, {
//             email: "admin@guurun.com",
//             password: "WXbrD28LtIR3MYm"
//         },
//             {
//                 responseType: 'json'
//             })
//             .then((response) => {
//                 console.log(response)
//                 this.props.setCreateToken(response.data.session_token)
//             })
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return{
//         setCreateToken : (token) => {
//             dispatch({
//                 type : "setCreateToken",
//                 payload : token
//             })
//         }
//     }
// }

// export default connect(null,mapDispatchToProps)(ConnectAPI)
