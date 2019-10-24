import * as Yup from 'yup';

import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { question } = req.body;

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Studend not found' });
    }

    const questions = await HelpOrder.create({
      student_id: id,
      question,
    });

    return res.json(questions);
  }
}

export default new HelpOrderController();
