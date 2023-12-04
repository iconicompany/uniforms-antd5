import DatePicker, { DatePickerProps } from 'antd/lib/date-picker';
import React, { Ref } from 'react';
import { connectField, FieldProps, filterDOMProps } from 'uniforms';
import wrapField from './wrapField';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

type DateFormat = "DD.MM.YYYY" | "DD.MM.YYYY HH:mm" | "DD.MM.YYYY HH:mm:ss" | "YYYY-MM-DD" | "YYYY-MM-DD HH:mm" | "YYYY-MM-DD HH:mm:ss";

export type DateFieldProps = FieldProps<
  Dayjs | null,
  DatePickerProps & { format?: DateFormat }, // Include format in DatePickerProps
  { inputRef?: Ref<typeof DatePicker>; showTime?: boolean }
>;

function CustomDateField({
                           value,
                           showTime = false,
                           onChange,
                           id,
                           format = 'DD.MM.YYYY', // Default format if not provided
                           ...props
                         }: DateFieldProps): React.ReactNode {
  return wrapField(
    props,
    <DatePicker
      {...props}
      disabled={props.disabled}
      inputReadOnly={props.readOnly}
      name={props.name}
      placeholder={props.placeholder}
      // @ts-expect-error: `DatePicker` is an intersection.
      ref={props.inputRef}
      {...filterDOMProps(props)}
      showTime={showTime}
      id={id}
      style={{ width: '100%' }}
      value={value ? dayjs(value) : undefined} // Convert value to dayjs object
      onChange={(date) => {
        if (!props.readOnly) {
          onChange(date); // Use the provided date object directly
        }
      }}
      format={format} // Pass the format directly to the DatePicker
    />
  );
}

export default connectField(CustomDateField, { kind: 'leaf' });
