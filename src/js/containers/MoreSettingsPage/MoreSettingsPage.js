import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import _ from 'lodash';

import { Heading } from 'cf-component-heading';

import { getPluginSettingsForZoneId } from '../../selectors/pluginSettings';
import { renderCards } from '../../components/RenderCardsDynamically/RenderCardsDynamically';

class MoreSettingsPage extends Component {

    renderContent() {
        let { config } = this.props;
        var count = 0;

        return _.map(config.moreSettingsCards, function(value, key) {
            var categoryTitle = key;
            return (
                <div key={count++}>
                    <Heading size={1}><FormattedMessage id={ categoryTitle } /></Heading>
                    { renderCards(value) }
                </div>
            ); 
        });
    }

    render() {
        let { activeZoneId, zoneSettings, zoneScan } = this.props;
        let isEmpty = _.isEmpty(zoneSettings[activeZoneId]) && _.isEmpty(getPluginSettingsForZoneId(activeZoneId, this.state)) && _.isEmpty(zoneScan.entities[activeZoneId]);

        return (
            <div>
                {isEmpty && (<FormattedMessage id="errors.noActiveZoneSelected"/>)}
                {!isEmpty && (
                    <div>
                        
                        { this.renderContent() }
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeZoneId: state.activeZone.id,
        config: state.config.config,
        zoneSettings: state.zoneSettings.entities,
        zoneScan: state.zoneScan
    };
}
export default injectIntl(connect(mapStateToProps)(MoreSettingsPage));