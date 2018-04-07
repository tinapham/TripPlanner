import { pink500, grey400, red500, orange500} from 'material-ui/styles/colors';
const styles = {
    banner: {
        width: '100%',
        height: '350px',
        background: 'url("./images/home-bg.jpg") no-repeat center',
        backgroundSize: 'cover',
    },
    plusCircle: {
        color : pink500
    },
    labelApps:{
        display: `block`
    },
    toggleDiv: {
        marginTop: 40,
        marginBottom: 5
    },
    toggleLabel: {
        color: grey400,
        fontWeight: 100
    },
    buttons: {
        marginTop: 30,
        float: 'right'
    },
    saveButton: {
        marginLeft: 5
    },
    buttonAdd: {
        margin: 12
    },
    dangerButton:{
        backgroundColor: red500
    },
    helperTextStyle:{
        color: orange500
    }
}
export default styles;