const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const db = req.app.get('db');
    const {
      username,
      password,
      name,
      sex,
      age,
      favLanguage,
      lovesMac,
      preference,
      yearsCoding,
      state
    } = req.body;

    const hash = await bcrypt.hash(password, 11);

    //insert into db
    // username and password into users table
    const newUser = await db.auth.create_user({ username, hash })
    // profile data into profile table 
    await db.auth.create_profile(
      newUser[0].id,
      name,
      sex,
      age,
      favLanguage,
      lovesMac,
      preference,
      yearsCoding,
      state
    );

    req.session.user = {
      ...newUser[0]
    }

    console.log(req.session.user);

    res.status(200).json(req.session.user);
  } catch(e) {
    res.status(500).json(e);
  }
}

const login = async (req, res) => {
  const db = req.app.get('db');
  const {
    username,
    password
  } = req.body;

  const correctPassword = await db.auth.get_user_by_username({ username });
  if (correctPassword.length === 0) {
    res.status(500).json('Invalid Username/Password');
  } else {
    const areEqual = await bcrypt.compare(password, correctPassword[0].password);
    if (areEqual) {
      req.session.user = {
        ...correctPassword[0]
      }

      res.sendStatus(200)
    } else {
      res.status(500).json('Invalid Username/Password')
    }
  }
}

const logout = (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
}

module.exports = {
  register,
  login,
  logout
}