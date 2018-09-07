import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
import User from '../model/User';


router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.json({
    message: 'API Initialized!'
  });
});


router.route('/users')
  .get((req, res) => {
    User.find().exec((err, users) => {
      if (err) return res.json({err});
      else return res.json({users});
    });
  });


router.route('/users/:id')
  .get((req, res) => {
    User.find({ _id: req.params.id}).exec((err, user) => {
      if (err) return res.json(err);
      else return res.json({
        user
      });
    });
  });


router.route('/users/add')
  .post((req, res) => {
    const newUser = new User();
    const {
      name,
      telephone,
      location,
      disponibilities,
      price,
      likes,
      dislikes } = req.body;
    newUser.name = name;
    newUser.telephone = telephone;
    newUser.location = location;
    newUser.disponibilities = disponibilities;
    newUser.price = price;
    newUser.likes = likes;
    newUser.dislikes = dislikes;

    newUser.save((err, user) => {
      if (err) return res.json(err);
      else return res.json({
        'message': user.name + ' added successfully!',
        user
      });
    });
  });


router.route('/users/:id')
  .put((req, res) => {
    User.findByIdAndUpdate(req.params.id,
      req.body,
      (err, post) => {
        if (err) return res.json(err);
        else return res.json({
          'message': 'Updated successfully!',
          post
        });
      });
  });

router.route('/users/:id')
  .delete((req, res) => {
    User.findByIdAndRemove(
      req.params.id,
      (err, user) => {
        if (err) return res.json(err);
        else return res.json({
          'message': user.name + ' deleted successfully...'
        });
      });
  });



export default router;
