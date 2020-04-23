import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../utils';

function MonthlyDetail ({userRewards}) {
    return (<table className="customers">
        <thead>
            <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>Rewards</th>
            </tr>
        </thead>
        <tbody>
            {
                Object.keys(userRewards).map((monthName, i) => {
                    const rewards = userRewards[monthName];
                    return (<tr key={i}>
                        <td>{monthName}</td>
                        <td>{rewards.totalAmount}</td>
                        <td>{rewards.totalReward}</td>
                    </tr>)
                })
            }
            <tr className="summary-row">
                <td>Total</td>
                <td>{Utils.total(Object.values(userRewards), 'totalAmount')}</td>
                <td>{Utils.total(Object.values(userRewards), 'totalReward')}</td>
              </tr>
        </tbody>
    </table>);
}

MonthlyDetail.propTypes = {
    userRewards: PropTypes.object.isRequired
}

export default MonthlyDetail;