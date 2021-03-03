import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { Scope } from "@unform/core";
import "./principal.css";
import api from "../services/api";
import MaskedInput from "react-text-mask";

import Input from "../components/input";

const Principal = () => {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required("o campo obrigatório"),
        cpf: Yup.number().required("campo obrigatório"),
        email: Yup.string().required("campo obrigatório"),
        telefone: Yup.string().required("campo obrigatório"),
        estadoCivil: Yup.string().required("campo obrigatório"),
        address: Yup.object().shape({
          cep: Yup.string()
            .min(9, "no mínimo 9 caracteres")
            .required(" campo obrigatório"),
          estado: Yup.string().required(" campo obrigatório"),
          municipio: Yup.string()
            .min(3, "no mínimo 3 caracteres")
            .required(" campo obrigatório"),
          bairro: Yup.string().required(" campo obrigatório"),
          rua: Yup.string().required(" campo obrigatório"),
          numero: Yup.string().required(" campo obrigatório"),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current.setErrors({});

      reset();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
    try {
      await api.post("users", info);
      alert("CADASTRO EFETUADO");
      window.location.reload();
    } catch (err) {
      alert("Erro ao cadastrar, tente novamente");
    }
  }

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [cep, setCep] = useState("");
  const [estado, setEstado] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const info = {
    nome,
    cpf,
    email,
    telefone,
    estadoCivil,
    cep,
    estado,
    municipio,
    bairro,
    rua,
    numero,
    complemento,
  };

  return (
    <div className="App">
      <h1>Bem vindo ao seu cadastro</h1>
      <div class="formulario">
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            placeholder="NOME"
            type="text"
            name="nome"
            onChange={(e) => setNome(e.target.value)}
          />

          <MaskedInput
            placeholder="CPF"
            type="text"
            name="cpf"
            mask={[
              /[0-9]/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
            ]}
            onChange={(e) => setCpf(e.target.value)}
          ></MaskedInput>

          <Input
            placeholder="EMAIL"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <MaskedInput
            placeholder="TELEFONE PARA CONTATO"
            type="text"
            name="telefone"
            mask={[
              "(",
              /[1-9]/,
              /\d/,
              ")",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            onChange={(e) => setTelefone(e.target.value)}
          ></MaskedInput>

          <Input
            placeholder="ESTADO CIVIL"
            type="text"
            name="estadoCivil"
            onChange={(e) => setEstadoCivil(e.target.value)}
          />
          <Scope path="address">
            <MaskedInput
              placeholder="CEP"
              type="text"
              name="cep"
              mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
              onChange={(e) => setCep(e.target.value)}
            ></MaskedInput>

            <Input
              placeholder="ESTADO EX: SC"
              type="text"
              name="estado"
              onChange={(e) => setEstado(e.target.value)}
            />
            <Input
              placeholder="MUNICÍPIO"
              type="text"
              name="municipio"
              onChange={(e) => setMunicipio(e.target.value)}
            />
            <Input
              placeholder="BAIRRO"
              type="text"
              name="bairro"
              onChange={(e) => setBairro(e.target.value)}
            />
            <Input
              placeholder="RUA"
              type="text"
              name="rua"
              onChange={(e) => setRua(e.target.value)}
            />
            <Input
              placeholder="NÚMERO"
              type="text"
              name="numero"
              onChange={(e) => setNumero(e.target.value)}
            />
            <textarea
              placeholder="COMPLEMENTO"
              type="text"
              name="complemento"
              onChange={(e) => setComplemento(e.target.value)}
            />
          </Scope>
          <br />
          <button type="submit">salvar</button>
          <button type="reset">limpar</button>
        </Form>
      </div>
    </div>
  );
};

export default Principal;
