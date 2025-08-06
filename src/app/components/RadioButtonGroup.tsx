import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";

interface Props {
    options: any[];
    onChange: (event: any) => void;
    selectedValue: string;
}

export default  function RadioButtonGroup({options, onChange, selectedValue} : Props) {
    const handleChange= (e: any) => {
        const selectOption = options.find(option => option.value === e.target.value);
        onChange(selectOption)
    }
    return (
        <FormControl component={"fieldset"}>
            <RadioGroup onChange={handleChange} value={selectedValue}>
                {options.map(({value, label}) => (
                    <FormControlLabel key={value} value={value} control={<Radio/>} label={label}/>
                ))}
            </RadioGroup>
        </FormControl>
    )
}