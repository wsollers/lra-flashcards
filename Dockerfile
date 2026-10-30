FROM mambaorg/micromamba:1.5.10

ARG MAMBA_DOCKERFILE_ACTIVATE=1

USER root
WORKDIR /workspace

RUN micromamba install -y -n base -c conda-forge \
      python=3.11 \
      nodejs=22 \
      rdkit \
      openbabel \
      cairo \
      librsvg \
      poppler \
    && micromamba clean -a -y

RUN python -m pip install --no-cache-dir \
      chembl_structure_pipeline \
      svgwrite

COPY . /workspace

EXPOSE 8000

CMD ["python", "-m", "http.server", "8000", "--bind", "0.0.0.0"]
