import { StackNavigator } from 'react-navigation';
import SingleLogin from '../container/singleLogin'
import Login from '../container/login'
import ShirtPhotoPlus from '../container/shirtphotoplus'
import CreditPayment from '../container/creditPayment'
import AddressLayout from '../container/addressLayout'
import TotalPayment from '../container/totalLayout'
import Register from '../container/userRegister'
import TeamList from '../container/teamList'
import TabRouter from '../config/tabrouter'
import AddEventFriend from '../container/AddEventDetailFrind'
import TransferPayment from '../container/tranferPayment'
import TotalRegister from '../component/items/totalRegister'
import EventList from '../container/ListEvent'
import DiscountCoupon from '../component/form/couponForm'
import GetPleace from '../component/items/getPlece'
import UserHelpRegister from '../container/userHelpRegister'
import UserAddressRegister from '../container/userAddressRegister'
import ControlDistance from '../container/controlDistance'
import ButtonChangePayment from '../component/items/bottonChangePayment'
import ButtonChangeTranfer from '../component/items/bottonChangeTranfer'
import Verify from '../container/verify'
import ResetVerify from '../container/resetVerify'
import ResetPassword from '../container/resetPassword'
import FriendDistance from '../container/friendDistance'

import ControlPayment from '../container/controlPayment'
import Test from '../navigation/AppNavigator'


export default StackNavigator({
    // TotalPayment: {
    //     screen: TotalPayment,
    //     navigationOptions: {
    //         header : () => null
    //     }
    // },
    EventList: {
        screen: EventList,
        navigationOptions: {
            title: 'รายการวิ่ง',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                fontFamily: "Kanit",
            }
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header : () => null

        }
    },
    SingleLogin: {
        screen: SingleLogin,
        navigationOptions: {
            header: () => null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: () => null
        }
    },
    UserAddressRegister: {
        screen: UserAddressRegister,
        navigationOptions: {
            header : () => null

        }
    },
    UserHelpRegister: {
        screen: UserHelpRegister,
        navigationOptions: {
            header : () => null
        }
    },
    Verify: {
        screen: Verify,
        navigationOptions: {
            header : () => null

        }
    },
    ResetVerify: {
        screen: ResetVerify,
        navigationOptions: {
            header : () => null
        }
    },
    ResetPassword: {
        screen: ResetPassword,
        navigationOptions: {
            title: "ขอรหัสผ่านใหม่",
            headerStyle: {
                backgroundColor: "#FC561F"
            },
            headerTitleStyle: {
                color: "#fff"
            }
        }
    },
    ShirtPhotoPlus: {
        screen: ShirtPhotoPlus,
        navigationOptions: {
            header : () => null
        }
    },
    DiscountCoupon: {
        screen: DiscountCoupon,
        navigationOptions: {
            header : () => null
        }
    },
    ControlDistance: {
        screen: ControlDistance,
        navigationOptions: {
            header: () => null
        }
    },
    ControlPayment: {
        screen: ControlPayment,
        navigationOptions: {
            header : () => null
        }
    },
    ButtonChangePayment: {
        screen: ButtonChangePayment,
        navigationOptions: {
            header : () => null
        }
    },
    ButtonChangeTranfer:{
        screen : ButtonChangeTranfer,
        navigationOptions : {
            header: () => null
        }
    },
    TabRouter: {
        screen: TabRouter,
        navigationOptions: {
            header: () => null
        }
    },
    TeamList: {
        screen: TeamList,
        navigationOptions: {
            header : () => null
        }
    },

    CreditPayment: {
        screen: CreditPayment
    },
    TransferPayment: {
        screen: TransferPayment
    },
    AddressLayout: {
        screen: AddressLayout,
        navigationOptions: {
            header : () => null
        }
    },
    TotalPayment: {
        screen: TotalPayment,
        navigationOptions: {
            header : () => null
        }
    },
    AddEventFriend: {
        screen: AddEventFriend,
        navigationOptions: {
            title: 'เลือกระยะทางเเละเสื้อ',
            headerStyle: {
                backgroundColor: '#FC561F'
            },
            headerTitleStyle: {
                color: '#fff',
                fontFamily: "Kanit",
                fontWeight: '500',
            }
        }
    },
    FriendDistance: {
        screen: FriendDistance,
        navigationOptions: {
            header: () => null
        }
    },
    TotalRegister: {
        screen: TotalRegister
    },
    GetPleace: {
        screen: GetPleace
    }


});