import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell
} from 'cf-component-table';
import { Heading } from 'cf-component-heading';
import { Button } from 'cf-component-button';

import ActivationCheckCard
  from '../../containers/ActivationCheckCard/ActivationCheckCard';
import DNSRecordEditor from '../../containers/DNSRecordEditor/DNSRecordEditor';
import ZoneProvisionContainer
  from '../../containers/ZoneProvisionContainer/ZoneProvisionContainer';
import { generateUTMLink } from '../../selectors/generateUTMLink.js';
import { CLOUDFLARE_UPGRADE_PAGE } from '../../constants/UrlPaths.js';
import { openWindow720x720 } from '../../utils/utils.js';

class DNSManagementPage extends Component {
  constructor(props) {
    super(props);
    this.className = 'DNSManagementPage';
  }

  render() {
    let { activeZone, config, dnsRecords, zones } = this.props;
    let isActiveZoneNameEmpty = _.isEmpty(activeZone.name);
    let isDnsRecordsEmpty = _.isEmpty(dnsRecords[activeZone.id]);
    let isPending = false;
    if (zones && activeZone.name) {
      isPending = zones[activeZone.name].status === 'pending';
    }

    let zone;
    if (!isActiveZoneNameEmpty) {
      zone = zones[activeZone.name];
    }

    let upgradeLinkWithUTM = generateUTMLink(
      CLOUDFLARE_UPGRADE_PAGE,
      config.integrationName,
      config.integrationName,
      this.className
    );
    let changePlanButton = (
      <Button
        type="success"
        onClick={openWindow720x720.bind(this, upgradeLinkWithUTM)}
      >
        <FormattedMessage id="container.dnsManagementPage.thead.changePlan" />
      </Button>
    );

    return (
      <div>
        <Heading size={1}>
          <FormattedMessage id="container.dnsManagementPage.title" />
        </Heading>
        {!isActiveZoneNameEmpty &&
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>
                    <FormattedMessage
                      id="container.dnsManagementPage.thead.domain"
                    />
                  </TableHeadCell>
                  <TableHeadCell>
                    <FormattedMessage
                      id="container.dnsManagementPage.thead.cloudflarePlan"
                    />
                  </TableHeadCell>
                  <TableHeadCell>
                    <FormattedMessage
                      id="container.dnsManagementPage.thead.zoneType"
                    />
                  </TableHeadCell>
                  <TableHeadCell>
                    <FormattedMessage
                      id="container.dnsManagementPage.thead.status"
                    />
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{zone.name}</TableCell>
                  <TableCell>
                    {zone.plan.name}
                    {' '}&nbsp;&nbsp;&nbsp;{' '}
                    {zone.plan.name != '' ? changePlanButton : null}
                  </TableCell>
                  <TableCell>{zone.type}</TableCell>
                  <TableCell>{zone.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {isPending ? <ActivationCheckCard /> : null}
            {!isDnsRecordsEmpty ? <DNSRecordEditor /> : null}

            <ZoneProvisionContainer />
          </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeZone: state.activeZone,
    config: state.config.config,
    zones: state.zones.entities.zones,
    dnsRecords: state.zoneDnsRecords.entities,
    zoneDeleteIsFetching: state.zones.zoneDeleteIsFetching,
    zoneProvisionCnameIsFetching: state.zones.zoneProvisionCnameIsFetching,
    zoneProvisionFullIsFetching: state.zones.zoneProvisionFullIsFetching
  };
}

export default injectIntl(connect(mapStateToProps)(DNSManagementPage));
