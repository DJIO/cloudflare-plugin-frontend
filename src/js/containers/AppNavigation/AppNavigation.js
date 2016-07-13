import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { routeActions } from 'redux-simple-router'

import Link from 'cf-component-link';

import * as UrlPaths from '../../constants/UrlPaths';
import { isLoggedIn } from '../../utils/Auth/Auth';

class AppNavigation extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    handleClick(path) {
        let { dispatch } = this.props;
        dispatch(routeActions.push(path));
    }

    render() {
        let { config } = this.props;

        return((isLoggedIn() && (
                <ul className="slider-nav-container apps-nav-container no-arrows" id="app-nav">
                    <li className="icon-item">
                        <Link onClick={() => this.handleClick(UrlPaths.HOME_PAGE)}>
                            <span className="icon">
                                <svg className="icon icon-home" fill="#ffffff" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 40 40">
                                    <path className="svg-main" d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"></path>
                                </svg>
                            </span>
                            <span className="icon-title">
                                <FormattedMessage id="container.appNavigation.home" />
                            </span>
                        </Link>
                    </li>
                    <li className="icon-item">
                        <Link onClick={() => this.handleClick(UrlPaths.MORE_SETTINGS_PAGE)}>
                            <span className="icon">
                                <svg className="icon-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 40 40">
                                    <path className="svg-main" d="M30,13l-6,6l-3-3l6-6h-7l-4,4v5l-6,6.1l4.9,4.9l6.1-6h5l4-4V13z"></path>
                                </svg>
                            </span>
                            <span className="icon-title">
                                <FormattedMessage id="container.appNavigation.moresettings" />
                            </span>
                        </Link>
                    </li>
                    { (config.integrationName == "wordpress") ?
                    <li className="icon-item">
                        <Link onClick={() => this.handleClick(UrlPaths.DOMAINS_OVERVIEW_PAGE)}>
                            <span className="icon">
                                <svg className="icon-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 40 40">
                                    <path className="svg-main" d="M24,12h-8v-2h8V12z M30,12v18H10V12h4v2h12v-2H30z M16,23h-3v3h3V23z M16,18h-3v3h3V18z M27,23h-9v3h9V23z M27,18h-9v3h9V18z"></path>
                                </svg>
                            </span>
                            <span className="icon-title">
                                <FormattedMessage id="container.appNavigation.domainsOverview" />
                            </span>
                        </Link>
                    </li>
                    : null }
                    <li className="icon-item">
                        <Link onClick={() => this.handleClick(UrlPaths.ANALYTICS_PAGE)}>
                            <span className="icon">
                                <svg className="icon-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 40 40">
                                    <path className="svg-main" d="M21,12.7V21h-8.3c0,5,3.9,8.9,8.7,8.9c4.8,0,8.5-3.8,8.5-8.6C29.9,16.5,26,12.7,21,12.7z"></path>
                                    <path className="svg-main" d="M19,19v-8.9c-5,0.5-8.4,4.5-8.9,8.9H19z"></path>
                                </svg>
                            </span>
                            <span className="icon-title">
                                <FormattedMessage id="container.appNavigation.analytics" />
                            </span>
                        </Link>
                    </li>
                </ul>
            ))
        );
    }
}

function mapStateToProps(state) {
    return { 
        config: state.config,
    };
}

export default injectIntl(connect(mapStateToProps)(AppNavigation));