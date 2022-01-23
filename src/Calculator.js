import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import useSWR, { mutate } from 'swr'

export default function Calculator() {
    const [values, setValues] = useState({
        startDate: null,
        endDate: null,
        grossIncome: '',
    });
    const [shouldCalculate, setShouldCalculate] = useState(false)
    const handleOnClick = () => {
        setShouldCalculate(true)
        // mutate('/api/calculate')
    }

    const fetcher = (...args) => fetch(...args).then(r => r.json())
    const {data, error} = useSWR(shouldCalculate ? ['/api/calculate', {
        method: "POST",
        body: JSON.stringify(values)
    }] : null, fetcher);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{display: 'flex'}}>
            <Box 
                sx={{
                    width: 200,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box 
                    sx={{
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '15px',
                    }}
                >
                    <Typography variant='body2'>Start of financial year date</Typography>
                </Box>
                <Box 
                    sx={{
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '15px',
                    }}
                >
                    <Typography variant='body2'>Latest pay period end date</Typography>
                </Box>
                <Box 
                    sx={{
                        height: 56,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant='body2'>YTD gross income from most recent payslip</Typography>
                </Box>
            </Box>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: '15px',
                }}
                noValidate
                autoComplete="off"
            >
                <Box sx={{ marginBottom: '15px' }}>
                    <DatePicker
                        value={values.startDate}
                        onChange={(newValue) => {
                            setValues({
                                ...values,
                                startDate: newValue,
                                });
                            }}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="dd/MM/yyyy"
                    />
                </Box>
                <Box sx={{ marginBottom: '15px' }}>
                    <DatePicker
                        value={values.endDate}
                        onChange={(newValue) => {
                            setValues({
                                ...values,
                                endDate: newValue,
                                });
                            }}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="dd/MM/yyyy"
                    />
                </Box>
                <Box sx={{ marginBottom: '15px' }}>
                    <TextField 
                        id="gross" 
                        value={values.grossIncome}
                        onChange={(event) => {
                            setValues({
                                ...values,
                                grossIncome: event.target.value,
                              });
                            }}
                        variant="outlined" 
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            inputMode: 'numeric', 
                            pattern: '[0-9]*',
                        }} 
                        fullWidth
                    />
                </Box>
                <Box>
                    <Button 
                        onClick={() => handleOnClick()}
                        variant="contained"
                    >
                        Calculate
                    </Button>
                </Box>
            </Box>
            {(data?.result > 0 && !error) && (
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '15px',
                    borderLeft: '1px solid rgba(0, 0, 0, .125)',
                }}>
                    <Box>
                        <Typography variant="body1" sx={{fontWeight: 'bold'}}>
                            Annualized payslip YTD figure
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2">
                            ${data?.result}
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    </LocalizationProvider>
  );
}
