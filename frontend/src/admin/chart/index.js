import React, {Component} from 'react';
import '../Admin.css';
import PageBase from '../../components/page-base/index';
import {BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import {VictoryPie, VictoryContainer} from 'victory';
import axios from "axios/index";
import styles from './styles';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const nearbyIcon = <IconLocationOn/>;
const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#b816ff',
];
class Chart extends Component {

    url_backend = process.env.REACT_APP_BACKEND_URL + "api/chart/";
    url = [this.url_backend + "guide", this.url_backend + "month"];

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
        };
    }

    select = (index) => this.setState({selectedIndex: index});

    async componentDidMount() {
        let data = [];
        let promises = [];
        this.url.forEach(url => {
            let promise = axios.get(url);
            promises.push(promise);
        });
        await axios.all(promises)
            .then(axios.spread((...promises) => {
                data = [...promises];
            }));
        this.setState({
            tourGuideChart: data[0].data,
            monthChart: data[1].data
        });
    }

    render() {
        console.log(this.state);
        const data2 = this.state.monthChart ? this.state.monthChart : [];
        let bar = this.state.tourGuideChart ? this.state.tourGuideChart : [];
        let sum = bar ? bar.reduce((total, el) => {
            return total + el.value;
        }, 0) : 0;
        return (
            <div>
                <PageBase title="Data Analysis"
                          navigation="Application / Chart">
                    <div>
                        <BottomNavigation selectedIndex={this.state.selectedIndex}>
                            <BottomNavigationItem
                                label="Tour Guide"
                                icon={nearbyIcon}
                                onClick={() => this.select(0)}
                            />
                            <BottomNavigationItem
                                label="Month"
                                icon={nearbyIcon}
                                onClick={() => this.select(1)}
                            />
                        </BottomNavigation>

                        {this.state.selectedIndex == 0 ?
                            <div>
                                <VictoryPie
                                    height={400}
                                    containerComponent={<VictoryContainer/>}
                                    colorScale={COLORS}
                                    data={bar}
                                    x="name"
                                    y="value"
                                    animate={{
                                        duration: 2000,
                                    }}
                                    width={1200}
                                    labels={d => `${d.x}: ${(d.y / sum * 100).toFixed(0)}%`}
                                />

                                <h4 style={{textAlign: 'center'}}>Total revenue per tour guide (%)</h4>
                            </div> : undefined
                        }

                        {this.state.selectedIndex == 1 ?
                            <div>
                                <BarChart width={600} height={500} data={data2}
                                          style={styles.barChart}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Bar dataKey="value" fill="#8884d8"/>
                                </BarChart>
                                <h4 style={{textAlign: 'center'}}>Total revenue per recent months ($)</h4>
                            </div> : undefined
                        }

                    </div>
                </PageBase>
            </div>
        )
    }
}

export default Chart;