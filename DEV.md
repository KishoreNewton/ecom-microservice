## REQUIREMENTS

* [ ] node
* [ ] npm/yarn
* [ ] docker - admin mode
* [ ] kubernetes
* [ ] minikube - linux
* [ ] skaffold

### RUN SKAFFOLD

In terminal root dir 
```bash
minikube start
skaffold dev
```

### Edit hosts file

#### Linux 

Find _ip address_ of **minikube** by entering `minikube ip`

**Example**, minikube ip `192.166.42.1`

Go and edit hosts file `/etc/hosts`

add

```
<yourminikubeip>    example.dev
```

Edit `ingress-srv.yaml` located in `infra/k8s` change `host` at line `10` to the domain that you have entered in `etc/hosts` file

**Example**,

\- host: `example.dev`

Now open chrome and go to `example.dev` and click anywhere on screen enter `thisisunsafe`


#### Windows/mac

Edit hosts file, add

```
127.0.0.1           example.dev
```

Edit `ingress-srv.yaml` located in `infra/k8s` change `host` at line `10` to the domain that you have entered in `etc/hosts` file

**Example**,

\- host: `example.dev`

Now open chrome and go to `example.dev` and click anywhere on screen enter `thisisunsafe`


### Connect to google cloud

Create a google kubernetes cluster and connect to project by running

```bash
gcloud init
```

```bash
gcloud container clusters get-credentials <project-id>
```

**Update Skaffold for cloud**