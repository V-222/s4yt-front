import React, { Component } from "react";
import { RegisterBase } from "./RegisterBase";
import { RegisterEducation } from "./RegisterEducation";
import { RegisterLocation } from "./RegisterLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default class RegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			name: "",
			email: "",
			password: "",
			password_confirmation: "",
			education: "",
			school: "",
			grade: "",
			country_iso: "",
			state_iso: "",
			city_id: "",
			base: {
				next: false,
				error: false,
				errors: {
					name: "",
					email: "",
					password: "",
					password_confirmation: "",
				},
			},
			educationStep: {
				next: false,
				error: false,
				errors: {
					education: "",
					school: "",
					grade: "",
				},
			},
			location: {
				error: false,
				errors: {
					country_iso: "",
					state_iso: "",
					city_id: "",
				},
			},
		};
		this.toggleStep = this.toggleStep.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.submit = this.submit.bind(this);
	}

	toggleStep = (e) => {
		const stepId = e.target.getAttribute("data-step-id");
		this.setState({
			step: parseInt(stepId),
		});
	};

	// Handle fields change and validation
	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	nextStep = () => {
		const { step } = this.state;
		console.log(step);
		this.setState({
			step: step + 1,
			base: {
				next: step === 1 || this.state.base.next,
			},
			education: {
				next: step === 2 && this.state.base.next,
			},
		});
	};

	submit = (e) => {
		// TODO: validate form
	};

	render() {
		return (
			<section className="row form-section">
				<ul className="steps">
					<li
						className={`step ${
							this.state.step === 1 || this.state.base.next ? "active" : ""
						} error`}
						data-step-id="1"
						onClick={this.toggleStep}
					>
						<FontAwesomeIcon
							icon={faXmark}
							className={`icon-error ${this.state.base.error ? "" : "hidden"}`}
						/>
					</li>
					<li
						className={`step-line ${this.state.base.next ? "active" : ""}`}
					></li>
					<li
						className={`step ${
							this.state.step === 2 || this.state.base.next ? "active" : ""
						}`}
						data-step-id="2"
						onClick={this.toggleStep}
					>
						<FontAwesomeIcon
							icon={faXmark}
							className={`icon-error ${
								this.state.education.error ? "" : "hidden"
							}`}
						/>
					</li>
					<li
						className={`step-line ${
							this.state.educationStep.next ? "active" : ""
						}`}
					></li>
					<li
						className={`step ${
							this.state.step === 3 || this.state.educationStep.next
								? "active"
								: ""
						}`}
						data-step-id="3"
						onClick={this.toggleStep}
					>
						<FontAwesomeIcon
							icon={faXmark}
							className={`icon-error ${
								this.state.location.error ? "" : "hidden"
							}`}
						/>
					</li>
				</ul>
				<form className="register-form" method="POST">
					<div className="col-10 offset-1 my-5 form-wrapper row test">
						<RegisterBase
							step={this.state.step}
							nextStep={this.nextStep}
							handleChange={this.handleChange}
							errors={this.state.base.errors}
						/>
						<RegisterEducation
							step={this.state.step}
							nextStep={this.nextStep}
							handleChange={this.handleChange}
							errors={this.state.educationStep.errors}
						/>
						<RegisterLocation
							step={this.state.step}
							nextStep={this.nextStep}
							handleChange={this.handleChange}
							errors={this.state.location.errors}
							submit={this.submit}
						/>
					</div>
				</form>
			</section>
		);
	}
}
