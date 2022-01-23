import differenceInDays from 'date-fns/differenceInDays'
import parseISO from 'date-fns/parseISO'

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { startDate, endDate, grossIncome } = JSON.parse(req.body)
        const diffInDays = differenceInDays(parseISO(endDate), parseISO(startDate));
        const income = parseInt(grossIncome)
        const result = ((income / diffInDays) * (365 - diffInDays) + income).toFixed(2);
        res.status(200).json({ result });
    } else {
        res.status(400).json({ error: 'Need additional data to calculate' });
    };
  }