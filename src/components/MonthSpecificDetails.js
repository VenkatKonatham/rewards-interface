import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Utils from '../utils';
import moment from 'moment';

function MonthSpecificDetail ({userTransactions}) {
    return (<Fragment>
        <h4>User Transactions</h4>
        {
            userTransactions.length > 0 ?
            <table className="customers">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Rewards</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userTransactions.map((item, index) => {
                            return (<tr key={index}>
                                <td>{moment(item.date).format('DD-MMM-YYYY')}</td>
                                <td>{item.amount}</td>
                                <td>{item.reward}</td>
                            </tr>);
                        })
                    }
                    <tr className="summary-row">
                            <td>Total</td>
                            <td>{Utils.total(userTransactions, 'amount')}</td>
                            <td>{Utils.total(userTransactions, 'reward')}</td>
                        </tr>
                    </tbody>
            </table> :
            <div>No Transactions Found</div>
        }
    </Fragment>);
}

MonthSpecificDetail.propTypes = {
    userTransactions: PropTypes.array.isRequired
}

export default MonthSpecificDetail;