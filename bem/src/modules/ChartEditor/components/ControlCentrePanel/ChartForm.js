import React from 'react';
import styled, { css } from 'styled-components';
import {
  Select,
  DatePicker,
  DatePickerInput,
  Button,
  SelectItem,
  NumberInput,
  TextInput
} from 'carbon-components-react';
import _ from 'lodash';
import moment from 'moment';
import {
  CHART_FORM_STEPS,
  BAR_CHART_TYPES,
  PIE_CHART_TYPES
} from '../../reducers/chartForm';

import ButtonPrimary from 'components/common/ButtonPrimary';

const FormContainer = styled.div`
  margin-top: 15px;
`;

const FormRow = styled.div`
  display: ${props => props.block ? 'block' : 'flex'};
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;

  .bx--select-input__wrapper {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-grow: 1;
  .bx--btn {
    padding: 0 15px
  }
  .bx--btn + .bx--btn {
    margin-left: 5px
  }
`;

const StepSelect = styled(Select)`
  &.bx--select {
    width: 100px;
  }
`;

const MaxiumDataPointSelect = styled(Select)`
  &.bx--select {
    width: 200px;
  }
`;

const ChartTypeSelect = styled(Select)`
  &.bx--select {
    width: 135px;
  }
`;

const DateTimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 10px;

  .bx--form-item + .bx--form-item {
    margin-left: 5px;
  }
`;

const DateTimeInput = styled(TextInput)`
  min-width: 50px;
  padding: 0 10px;
`;

const DateStyled = styled.div`
  .bx--form-item  {
    margin-right: 5px;
  }

  ${props => props.isBar && css `
    .bx--date-picker {
      width: 100%
    }
    .bx--date-picker-container {
      width: 50% !important;
    }
    .bx--date-picker-container input {
      width: 100%;
    }
  `}
`

const BarTypeStyled = styled.div`
  margin-bottom: 20px;
  .bx--select {
    width: 100%;
  }
  .bx--select-input {
    width: 100%;
  }
`

const maximumDataPoints = [10000];

const ChartForm = ({
  chart,
  formValues,
  setValue,
  submitForm,
  clearForm,
  sectionLength,
  setSectionLength,
  plottedType,
  setPlottedType
}) => {
  const { startDate, endDate, maxDate, minDate } = formValues;

  return (
    <FormContainer>
      <FormRow block={chart.type === 'bar'}>
        {chart.type === 'bar' && (
          <BarTypeStyled>
            <ChartTypeSelect
              id="chart-editor-chart-type-dropdown"
              labelText="Type"
              defaultValue="range"
              value={plottedType}
              onChange={e => setPlottedType(e.target.value)}
            >
              {BAR_CHART_TYPES.map(({ label, value }) => (
                <SelectItem key={label} value={value} text={label} />
              ))}
            </ChartTypeSelect>
          </BarTypeStyled>
        )}

        {chart.type === 'pie' && (
          <ChartTypeSelect
            id="chart-editor-chart-type-dropdown"
            labelText="Type"
            defaultValue="range"
            value={plottedType}
            onChange={e => setPlottedType(e.target.value)}
          >
            {PIE_CHART_TYPES.map(({ label, value }) => (
              <SelectItem key={label} value={value} text={label} />
            ))}
          </ChartTypeSelect>
        )}

        {((chart.type === 'pie' && plottedType === 'single') ||
          chart.type === 'radar') && (
          <DateTimeContainer>
            <DateTimeInput
              type="number"
              id="month-input"
              labelText="Month"
              onChange={e => setValue('month', e.target.value)}
            />
            <DateTimeInput
              type="number"
              id="month-input"
              labelText="Date"
              onChange={e => setValue('date', e.target.value)}
            />
            <DateTimeInput
              type="number"
              id="month-input"
              labelText="Hour"
              onChange={e => setValue('hour', e.target.value)}
            />
            <DateTimeInput
              type="number"
              id="month-input"
              labelText="Minute"
              onChange={e => setValue('minute', e.target.value)}
            />
          </DateTimeContainer>
        )}

        {plottedType === 'single' && chart.type !== 'pie'  && maxDate !== ''&& (
          <DateStyled isBar={chart.type === 'bar'}>
            <DatePicker
              id="chart-range"
              datePickerType="range"
              dateFormat="d/m/Y"
              minDate={minDate}
              maxDate={maxDate}
              onChange={dates => {
                setValue('startDate', dates[0]);
                if (dates.length > 1) setValue('endDate', dates[1]);
              }}
            >
              <DatePickerInput
                id="chart-range-start"
                labelText="Start"
                // value={
                //   formValues.startDate
                //     ? moment(formValues.startDate).format('DD/MM/YYYY')
                //     : ''
                // }
                value={moment(startDate).format('DD/MM/YYYY')}
              />
              <DatePickerInput
                id="chart-range-end"
                labelText="End"
                // value={
                //   formValues.endDate
                //     ? moment(formValues.endDate).format('DD/MM/YYYY')
                //     : ''
                // }
                value={moment(endDate).format('DD/MM/YYYY')}
              />
            </DatePicker>
          </DateStyled>
        )}

        {chart.type === 'line' && (
          <StepSelect
            id="chart-editor-select-steps"
            labelText="Steps"
            defaultValue="daily"
            value={formValues.steps}
            onChange={e => setValue('steps', e.target.value)}
          >
            {CHART_FORM_STEPS.map(step => (
              <SelectItem key={step} value={step} text={_.upperFirst(step)} />
            ))}
          </StepSelect>
        )}
      </FormRow>

      <FormRow>
        {plottedType === 'single' && chart.type === 'line' && (
          <MaxiumDataPointSelect
            id="chart-editor-select-maximum-data-points"
            labelText="Мax Number of Data Points"
            defaultValue={maximumDataPoints[0]}
            value={formValues.maximumDataPoints}
            onChange={value => setValue('maximumDataPoints', value)}
          >
            {maximumDataPoints.map(point => (
              <SelectItem key={point} value={point} text={point.toString()} />
            ))}
          </MaxiumDataPointSelect>
        )}

        {plottedType === 'group' && chart.type !== 'radar' && (
          <NumberInput
            id="section-number"
            label="Sections"
            value={sectionLength || 4}
            onChange={e => setSectionLength(Number(e.target.value))}
          />
        )}

        {chart.type === 'radar' && (
          <Button
            kind="secondary"
          >
            Add Simulation
          </Button>
        )}

        <ButtonContainer>
          <ButtonPrimary title="Apply" size="field" onClick={submitForm}/>
          <ButtonPrimary title="Reset" size="field" onClick={clearForm}/>
        </ButtonContainer>
      </FormRow>
    </FormContainer>
  );
};

export default ChartForm;
