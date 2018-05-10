import React, {Component} from 'react';
import '../Admin.css';
import PageBase from '../../components/page-base/index';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import {PieChart, Pie, Sector, Cell} from 'recharts';
import axios from "axios/index";
import styles from './styles';
const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
    {name: 'Group C', value: 300}, {name: 'Group D', value: 200}, {name: 'Group D', value: 200},
    {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'rgba(146, 16, 167, 0.87)'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, name}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + 0.4*radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${name} ${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

class Chart extends Component {

    url_backend = process.env.REACT_APP_BACKEND_URL + "api/chart/";
    url = [this.url_backend + "bar"];

    constructor(props) {
        super(props);
        this.state = {};
    }

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
            barChart: data[0].data,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.barChart !== this.state.barChart ) {
            this.setState({ barChart: this.state.barChart });
        }
    }

    render() {
        console.log(this.state);
        let data1 = [
            {
                name: 'Page A',
                pv: 100,
                uv: 200,
            },
            {
                name: 'Page B',
                pv: 200,
                uv: 300
            },
            {
                name: 'Page C',
                pv: 350,
                uv: 100
            }];
        let bar = this.state.barChart ? this.state.barChart : undefined;
        return (
            <div>
                <PageBase title="Total cost per Tour guide"
                          navigation="Application / Chart">
                    <div>
                        {/*<LineChart width={800} height={500} data={data1}*/}
                                   {/*margin={{top: 5, right: 30, left: 20, bottom: 5}}>*/}
                            {/*<CartesianGrid strokeDasharray="3 3"/>*/}
                            {/*<XAxis dataKey="name"/>*/}
                            {/*<YAxis/>*/}
                            {/*<Tooltip/>*/}
                            {/*<Legend/>*/}
                            {/*<Line type="monotone" dataKey="pv" stroke="#8884d8"/>*/}
                            {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d"/>*/}
                        {/*</LineChart>*/}

                        <PieChart width={800} height={500}
                                  onMouseEnter={this.onPieEnter}
                                  style={styles.barChart}
                        >
                            <Pie
                                data={bar}
                                cx={400}
                                cy={250}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                // label={bar}
                                outerRadius={200}
                                fill="#8884d8"
                            >
                                {
                                    data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                                }
                            </Pie>
                        </PieChart>
                    </div>
                </PageBase>
            </div>
        )
    }
}

export default Chart;