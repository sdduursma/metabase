"use strict";

import React, { Component, PropTypes } from "react";
import cx from "classnames";

import Icon from "metabase/components/Icon.react";

import CollapsedStep from "./CollapsedStep.react";
import { setAllowTracking, submitSetup } from "../actions";


export default class PreferencesStep extends Component {

    toggleTracking() {
        let { allowTracking } = this.props;

        this.props.dispatch(setAllowTracking(!allowTracking));
    }

    async formSubmitted(e) {
        e.preventDefault();

        // okay, this is the big one.  we actually submit everything to the api now and complete the process.
        this.props.dispatch(submitSetup());
    }

    render() {
        let { activeStep, allowTracking, setupComplete, stepNumber } = this.props;

        let stepText = 'Usage data preferences';
        if (setupComplete) {
            stepText = allowTracking ? "Thanks for helping us improve" : "We won't collect any usage events";
        }

        if (activeStep !== stepNumber || setupComplete) {
            return (<CollapsedStep stepNumber={stepNumber} stepText={stepText} isCompleted={setupComplete}></CollapsedStep>)
        } else {
            return (
                <section className="SetupStep rounded full relative SetupStep--active">
                    <div className="flex align-center py3">
                        <span className="SetupStep-indicator flex layout-centered absolute bordered">
                            <span className="SetupStep-number">{stepNumber}</span>
                            <Icon name={'check'} className="SetupStep-check" width={16} height={16}></Icon>
                        </span>
                        <h3 className="SetupStep-title ml4 my1">{stepText}</h3>
                    </div>
                    <form onSubmit={this.formSubmitted.bind(this)} novalidate>
                        <div className="Form-field Form-offset">
                            In order to help us improve Metabase, we'd like to collect certain data about usage through Google Analytics.  <a className="link" href="">Here's a full list of everything we track and why.</a>
                        </div>

                        <div className="Form-field Form-offset mr4">
                            <div style={{borderWidth: "2px"}} className="bordered rounded p2">
                                <div className={cx('Button-toggle', {'Button--toggled': allowTracking})} onClick={this.toggleTracking.bind(this)}>
                                    <span className="Button-toggleIndicator">
                                        <svg width="14px" height="14px" viewBox="0 0 16 16" fill="currentcolor"></svg>
                                    </span>
                                </div>
                                <span className="ml1">Allow Metabase to anonymously collect usage events</span>
                            </div>
                        </div>

                        { allowTracking ?
                            <div className="Form-field Form-offset">
                                <ul style={{listStyle: "disc inside", lineHeight: "200%"}}>
                                    <li>Metabase <span style={{fontWeight: "bold"}}>never</span> collects anything about your data or question results.</li>
                                    <li>All collection is completely anonymous.</li>
                                    <li>Collection can be turned off at any point in your admin settings.</li>
                                </ul>
                            </div>
                        : null }

                        <div className="Form-actions">
                            <button className="Button Button--primary" ng-click="setUsagePreference()">
                                Next
                            </button>
                            <mb-form-message form="usageForm"></mb-form-message>
                        </div>
                    </form>
                </section>
            );
        }
    }
}

PreferencesStep.propTypes = {
    dispatch: PropTypes.func.isRequired,
    stepNumber: PropTypes.number.isRequired
}
