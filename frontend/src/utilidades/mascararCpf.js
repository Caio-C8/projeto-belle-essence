export const mascararCpf = (cpf) => {
  return cpf.replace(/^(\d{3})\.\d{3}\.\d{3}-\d{2}$/, "$1.***.***-**");
};
