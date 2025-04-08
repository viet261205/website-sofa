import React from "react";
import { Button, Form, Input } from "antd";
import { useAuth } from "../../hooks";

function Login() {
  const { mutate } = useAuth({ resource: "login" });

  const onFinish = (values: any) => {
    mutate(values);
  };

  return (
    <section className="login_part padding_top">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6">
            <div className="login_part_text text-center">
              <div className="login_part_text_iner">
                <h2>New to our Shop?</h2>
                <p>
                  There are advances being made in science and technology
                  every day, and a good example of this is the
                </p>
                <a href="#" className="btn_3">
                  Create an Account
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="login_part_form">
              <div className="login_part_form_iner">
                <h3>
                  Welcome Back! <br />
                  Please Sign in now
                </h3>
                {/* Form đăng nhập bằng Ant Design */}
                <Form onFinish={onFinish} className="row contact_form">
                  <div className="col-md-12 form-group p_star">
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, message: "Please input your email!" }]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col-md-12 form-group p_star">
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: "Please input your password!" }]}
                    >
                      <Input.Password />
                    </Form.Item>
                  </div>
                  <div className="col-md-12 form-group">
                    <div className="creat_account d-flex align-items-center">
                      <input type="checkbox" id="f-option" name="selector" />
                      <label htmlFor="f-option">Remember me</label>
                    </div>
                    <Button type="primary" htmlType="submit" className="btn_3">
                      Log in
                    </Button>
                    <a className="lost_pass" href="#">
                      Forget password?
                    </a>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
