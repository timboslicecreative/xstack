FROM apsl/thumbor:latest
WORKDIR /usr/src/app/
RUN pip install --upgrade pip
RUN pip install python-magic boto3 thumbor_spaces tc_aws
COPY ./thumbor.conf.tpl /usr/src/app/thumbor.conf.tpl