import React, {Component} from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Camapaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

    static async getInitialProps(props) {
       const campaign = Camapaign (props.query.address);

       const summary = await campaign.methods.getSummary().call();

       return {
           address: props.query.address,
           minimumContribution: summary[0],
           balance: summary[1],
           requestsCount: summary[2],
           approversCount: summary[3],
           manager: summary[4]
       };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta:'Address of Manager',
                description: 'The Manager created this campaign and create requests to withdraw money.',
                style: { overflowWrap: 'break-word' }
            },

            {
                header: minimumContribution,
                meta:'Minimum contribution in (Wei)',
                description: 'You must contribute atlest this much wei to become a contributor.',
                style: { overflowWrap: 'break-word' }
            },

            {
                header: requestsCount,
                meta:'Number of Request',
                description: 'Request try to withdraw money from the contract. Requests must be approved by the approvers',
                style: { overflowWrap: 'break-word' }
            },

            {
                header: approversCount,
                meta:'Number of Approvers',
                description: 'Number of people who have already donated to the Campaign.',
                style: { overflowWrap: 'break-word' }
            },

            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta:'Campaign balance in (Ether)',
                description: 'Balance is the amount of money left in the campaign to spend.',
                style: { overflowWrap: 'break-word' }
            }

        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm address= {this.props.address} />                   
                        </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                <Link route={`/campaigns/${this.props.address}/requests`}>
                                    <a>
                                        <Button primary>View Requests</Button>
                                    </a>
                                </Link>
                                </Grid.Column>
                        </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}
export default CampaignShow;