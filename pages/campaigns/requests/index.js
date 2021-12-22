import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Layout from '../../../components/Layout'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/RequestRow'

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query

    const campaign = Campaign(address)
    const requestsCount = await campaign.methods.getRequestsCount().call()
    const approversCount = await campaign.methods.approversCount().call()

    const requests = await Promise.all(
      Array(parseInt(requestsCount)).fill().map((elem, index) =>
        campaign.methods.requests(index).call()
      )
    )

    return { address, requests, requestsCount, approversCount }
  }

  renderRows() {
    return this.props.requests.map((request, index) =>
      <RequestRow
        key={ index }
        id={ index }
        request={ request }
        approversCount={ this.props.approversCount }
        address={ this.props.address }
      />
    )
  }

  render () {
    const { Header, Row, HeaderCell, Body } = Table
    return (
      <Layout>
        <h3>Pending Requests</h3>
        <Link route={`/campaigns/${ this.props.address }/requests/new`}>
          <a>
            <Button primary floated='right' style={{ marginBottom: 10 }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            { this.renderRows() }
          </Body>
        </Table>
        <div>
          Found { this.props.requestsCount } requests
        </div>
      </Layout>
    )
  }
}

export default RequestIndex