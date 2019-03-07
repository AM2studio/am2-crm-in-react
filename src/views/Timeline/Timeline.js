/*  global gantt */

import React, { Component } from 'react';
import 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default class Gantt extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
    }

    componentDidMount() {
        const { onTaskUpdated } = this.props;
        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
            if (onTaskUpdated) {
                Promise.resolve(onTaskUpdated(id, 'inserted', task)).then(result => {
                    gantt.changeTaskId(id, result.id);
                });
            }
        });

        gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
            if (onTaskUpdated) {
                onTaskUpdated(id, 'updated', task);
            }
        });

        gantt.attachEvent('onAfterTaskDelete', id => {
            if (onTaskUpdated) {
                onTaskUpdated(id, 'deleted');
            }
        });

        gantt.config.scale_unit = 'month';
        gantt.config.step = 1;
        gantt.config.date_scale = '%F, %Y';
        gantt.config.template = this.weekScaleTemplate;
        gantt.config.min_column_width = 50;
        // gantt.config.fit_tasks = true;
        // ubaciti da mogu prebaciti na month, ukoliko ljudi nestaju.
        // https://docs.dhtmlx.com/gantt/samples/03_scales/05_dynamic_scales.html
        // https://docs.dhtmlx.com/gantt/samples/04_customization/12_custom_task_type.html custom input polja
        gantt.config.scale_height = 60;

        gantt.config.subscales = [
            { unit: 'week', step: 1, template: this.weekScaleTemplate },
            { unit: 'day', step: 1, date: '%d %D', css: this.daysStyle }
        ];
        gantt.init(
            this.container.current,
            new Date().setDate(new Date().getDate() - 15),
            new Date().setDate(new Date().getDate() + 15)
        );
    }

    componentDidUpdate() {
        const { users } = this.props;
        gantt.clearAll();
        gantt.parse(users);
        gantt.render();
    }

    weekScaleTemplate = date => {
        const dateToStr = gantt.date.date_to_str('%d %M');
        const endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1, 'day');
        return `${dateToStr(date)} - ${dateToStr(endDate)}`;
    };

    daysStyle = date => {
        const dateToStr = gantt.date.date_to_str('%D');
        if (dateToStr(date) === 'Sun' || dateToStr(date) === 'Sat') return 'weekend';
        return '';
    };

    render() {
        return <div ref={this.container} style={{ width: '100%', minHeight: '750px', height: '100%' }} />;
    }
}
